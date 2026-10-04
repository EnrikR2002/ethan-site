import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFile } from 'node:fs/promises';
import { validateEvent, classifyLink, EVENT_COLUMNS } from '../src/lib/funnel-schema.js';
import { analyzeEvents, parseCsv } from '../scripts/analyze-funnel.mjs';
import { onRequestGet as status } from '../functions/api/funnel/status.js';
import { onRequestPost as collect } from '../functions/api/funnel/events.js';
import { onRequestGet as exportEvents } from '../functions/api/funnel/export.js';

const origin='https://syfer-media.pages.dev',secret='test-only-export-token-'.padEnd(40,'x');
const makeEvent = (extra={}) => ({event_id:crypto.randomUUID(),session_id:crypto.randomUUID(),occurred_at:new Date().toISOString(),event:'page_view',page:'/consulting/',destination:'/consulting/',placement:'inline',source:'direct',device:'desktop',study:'',...extra});
const sql=await readFile(new URL('../analytics/schema.sql',import.meta.url),'utf8');
function database() {
  const sqlite=new DatabaseSync(':memory:');sqlite.exec(sql);
  const db={prepare(statement){let values=[];return {bind(...args){values=args;return this;},async all(){return {results:sqlite.prepare(statement).all(...values)};},async first(){return sqlite.prepare(statement).get(...values);},async run(){return sqlite.prepare(statement).run(...values);}};}};
  return {db,sqlite};
}
function context(path,env,body,extraHeaders={}) {
  return {env,request:new Request(origin+path,{method:body===undefined?'GET':'POST',headers:{Origin:origin,'Content-Type':'text/plain',...extraHeaders},...(body===undefined?{}:{body:typeof body==='string'?body:JSON.stringify(body)})})};
}

test('readiness stays off without storage, enable flag, schema and protected export',async()=>{
  assert.deepEqual(await (await status(context('/api/funnel/status',{}))).json(),{ready:false});
  const {db,sqlite}=database();
  const env={FUNNEL_DB:db,FUNNEL_ENABLED:'true',FUNNEL_EXPORT_TOKEN:secret};
  assert.deepEqual(await (await status(context('/api/funnel/status',env))).json(),{ready:true});
  sqlite.exec('DROP TABLE funnel_events');
  assert.deepEqual(await (await status(context('/api/funnel/status',env))).json(),{ready:false});
  sqlite.close();
});

test('collector validates origin, size, dimensions and privacy preferences; retries deduplicate',async()=>{
  const {db,sqlite}=database(),env={FUNNEL_DB:db,FUNNEL_ENABLED:'true',FUNNEL_EXPORT_TOKEN:secret};
  const event=makeEvent({email:'do-not-store@example.test',ip:'discard',url:'discard'});
  assert.equal((await collect(context('/api/funnel/events',env,event,{Origin:'https://other.test'}))).status,403);
  assert.equal((await collect(context('/api/funnel/events',{},event))).status,503);
  assert.equal((await collect(context('/api/funnel/events',env,event,{DNT:'1'}))).status,204);
  assert.equal(sqlite.prepare('SELECT COUNT(*) AS n FROM funnel_events').get().n,0);
  assert.equal((await collect(context('/api/funnel/events',env,'x'.repeat(5000)))).status,400);
  assert.equal((await collect(context('/api/funnel/events',env,{...event,event:'invented'}))).status,400);
  assert.equal((await collect(context('/api/funnel/events',env,event))).status,204);
  assert.equal((await collect(context('/api/funnel/events',env,event))).status,204);
  const stored=sqlite.prepare('SELECT * FROM funnel_events').all();assert.equal(stored.length,1);
  assert.deepEqual(Object.keys(stored[0]),[...EVENT_COLUMNS,'received_at']);
  assert.equal(JSON.stringify(stored).includes('do-not-store'),false);
  const statement=sqlite.prepare(`INSERT INTO funnel_events (${EVENT_COLUMNS.join(',')},received_at) VALUES (${[...EVENT_COLUMNS,'received_at'].map(()=>'?').join(',')})`);
  for(let i=0;i<59;i++){const item=makeEvent({session_id:event.session_id});statement.run(...EVENT_COLUMNS.map(k=>item[k]),new Date().toISOString());}
  assert.equal((await collect(context('/api/funnel/events',env,makeEvent({session_id:event.session_id})))).status,429);
  sqlite.close();
});

test('private export authenticates, validates date ranges, and paginates without dropped rows',async()=>{
  const {db,sqlite}=database(),env={FUNNEL_DB:db,FUNNEL_ENABLED:'true',FUNNEL_EXPORT_TOKEN:secret};
  assert.equal((await exportEvents(context('/api/funnel/export',env))).status,401);
  const authorized=(path)=>context(path,env,undefined,{Authorization:`Bearer ${secret}`});
  assert.equal((await exportEvents(authorized('/api/funnel/export?from=2026-02-31&to=2026-03-02'))).status,400);
  assert.equal((await exportEvents(authorized('/api/funnel/export?cursor=bad'))).status,400);
  const statement=sqlite.prepare(`INSERT INTO funnel_events (${EVENT_COLUMNS.join(',')},received_at) VALUES (${[...EVENT_COLUMNS,'received_at'].map(()=>'?').join(',')})`);
  for(let i=0;i<2501;i++){const item=makeEvent();statement.run(...EVENT_COLUMNS.map(k=>item[k]),new Date().toISOString());}
  const first=await (await exportEvents(authorized('/api/funnel/export'))).json();assert.equal(first.events.length,2500);assert.ok(first.next_cursor);
  const second=await (await exportEvents(authorized('/api/funnel/export?cursor='+encodeURIComponent(first.next_cursor)))).json();assert.equal(second.events.length,1);assert.equal(second.next_cursor,null);
  assert.equal(new Set([...first.events,...second.events].map(e=>e.event_id)).size,2501);
  sqlite.close();
});

test('retention removes expired rows on ingestion',()=>{
  const {sqlite}=database(),statement=sqlite.prepare(`INSERT INTO funnel_events (${EVENT_COLUMNS.join(',')},received_at) VALUES (${[...EVENT_COLUMNS,'received_at'].map(()=>'?').join(',')})`);
  const old=makeEvent();statement.run(...EVENT_COLUMNS.map(k=>old[k]),new Date(Date.now()-91*86400_000).toISOString());
  assert.equal(sqlite.prepare('SELECT COUNT(*) AS n FROM funnel_events').get().n,0);sqlite.close();
});

test('schema removes unsolicited fields and classifies links without storing contact addresses',()=>{
  const item=makeEvent({email:'private'});assert.deepEqual(Object.keys(validateEvent(item)),EVENT_COLUMNS);
  assert.throws(()=>validateEvent({...item,occurred_at:'2020-01-01T00:00:00.000Z'}));
  assert.deepEqual(classifyLink('mailto:private@example.test',origin),{event:'contact_click',destination:'email'});
  assert.deepEqual(classifyLink(origin+'/offer/?private=discard',origin),{event:'offer_click',destination:'/offer/'});
  assert.deepEqual(classifyLink(origin+'/growth-bottleneck-sprint.pdf',origin,true),{event:'pdf_download',destination:'offer-pdf'});
  assert.equal(classifyLink('https://other.test/offer/',origin),null);
});

test('analysis separates ordered paths, repeat clicks, duplicates, empty exports and bookings',()=>{
  const start=Date.now()-10000,s='test-session',create=(seconds,event,page,id=crypto.randomUUID())=>({event_id:id,session_id:s,occurred_at:new Date(start+seconds*1000).toISOString(),event,page});
  const clicked=create(1,'fit_call_click','/consulting/'),view=create(2,'page_view','/consulting/');
  assert.equal(analyzeEvents([clicked,view]).consulting_then_fit_call_click_sessions,0);
  const later=create(3,'fit_call_click','/consulting/'),r=analyzeEvents([clicked,view,later,later]);
  assert.equal(r.sessions,1);assert.equal(r.events,3);assert.equal(r.fit_call_clicks,2);assert.equal(r.fit_call_click_sessions,1);assert.equal(r.consulting_then_fit_call_click_sessions,1);assert.equal(r.duplicate_rows_ignored,1);
  assert.equal(r.profile_to_consulting_percent,null);assert.equal(r.completed_bookings,null);assert.equal(r.sprint_sales,null);
  assert.throws(()=>analyzeEvents([]));assert.throws(()=>analyzeEvents([view,{...view,page:'/offer/'}]));
  assert.deepEqual(parseCsv('\uFEFFa,b\r\n"comma,inside","double""quote"\r\n'),[{a:'comma,inside',b:'double"quote'}]);
  assert.throws(()=>parseCsv('a,b\n"unclosed,b'));
});

test('browser tracker sends nothing when unconfigured; enabled payloads omit personal URLs',async()=>{
  const storage=()=>{const values=new Map();return {getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k),values};};
  const sent=[],listeners={};let ready=false;
  Object.defineProperty(globalThis,'location',{value:new URL(origin+'/consulting/?email=discard&utm_source=linkedin'),configurable:true});
  Object.defineProperty(globalThis,'navigator',{value:{sendBeacon:(url,blob)=>{sent.push({url,blob});return true;}},configurable:true});
  Object.defineProperty(globalThis,'innerWidth',{value:390,configurable:true});
  globalThis.localStorage=storage();globalThis.sessionStorage=storage();
  globalThis.document={referrer:'https://linkedin.com/in/private?email=discard',addEventListener:(type,cb)=>listeners[type]=cb,querySelectorAll:()=>[]};
  globalThis.fetch=async()=>({ok:true,json:async()=>({ready})});
  const {startFunnelTracking}=await import('../src/lib/funnel-tracker.js');
  await startFunnelTracking();assert.equal(sent.length,0);assert.equal(sessionStorage.values.size,0);
  ready=true;await startFunnelTracking();assert.equal(sent.length,1);
  const payload=JSON.parse(await sent[0].blob.text());validateEvent(payload);assert.equal(payload.source,'linkedin');assert.equal(payload.device,'mobile');
  assert.equal(JSON.stringify(payload).includes('email='),false);assert.equal(JSON.stringify(payload).includes('/in/private'),false);
  localStorage.setItem('syfer-funnel-opt-out','1');await startFunnelTracking();assert.equal(sent.length,1);
});
