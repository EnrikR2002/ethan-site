import { EVENT_COLUMNS } from '../../../src/lib/funnel-schema.js';
import { configured, authorized, json, headers } from '../../../server/funnel.js';

const day = value => typeof value==='string' && /^\d{4}-\d\d-\d\d$/.test(value) && Number.isFinite(Date.parse(value+'T00:00:00Z')) && new Date(value+'T00:00:00Z').toISOString().slice(0,10)===value;
export async function onRequestGet(context) {
  if (!await authorized(context.request,context.env.FUNNEL_EXPORT_TOKEN)) return json({error:'unauthorized'},401);
  if (!configured(context)) return json({error:'unavailable'},503);
  const url=new URL(context.request.url), now=new Date();
  const from=url.searchParams.get('from') || new Date(now.valueOf()-6*86400_000).toISOString().slice(0,10), to=url.searchParams.get('to') || now.toISOString().slice(0,10);
  if (!day(from)||!day(to)||to<from||Date.parse(to)-Date.parse(from)>89*86400_000) return json({error:'date_range'},400);
  const until=new Date(Date.parse(to)+86400_000).toISOString();
  let cursorTime='',cursorId='';
  const cursor=url.searchParams.get('cursor');
  if(cursor){try{const decoded=JSON.parse(atob(cursor));if(!Array.isArray(decoded)||decoded.length!==2||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(decoded[0])||!Number.isFinite(Date.parse(decoded[0]))||!/^[-a-f0-9]{36}$/i.test(decoded[1]))throw new Error();[cursorTime,cursorId]=decoded;}catch{return json({error:'cursor'},400);}}
  try {
    const result=await context.env.FUNNEL_DB.prepare(`SELECT ${EVENT_COLUMNS.join(',')},received_at FROM funnel_events WHERE occurred_at>=? AND occurred_at<? AND (received_at>? OR (received_at=? AND event_id>?)) ORDER BY received_at,event_id LIMIT 2501`).bind(from+'T00:00:00.000Z',until,cursorTime,cursorTime,cursorId).all();
    const rows=result.results.slice(0,2500),last=rows.at(-1);
    const next_cursor=result.results.length>2500?btoa(JSON.stringify([last.received_at,last.event_id])):null;
    return json({events:rows.map(row=>Object.fromEntries(EVENT_COLUMNS.map(key=>[key,row[key]]))),next_cursor});
  } catch {return json({error:'unavailable'},503);}
}
