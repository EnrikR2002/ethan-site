import { validateEvent, EVENT_COLUMNS, PRODUCTION_HOST } from '../../../src/lib/funnel-schema.js';
import { configured, readLimited, json, headers } from '../../../server/funnel.js';

export async function onRequestPost(context) {
  const request=context.request;
  if (request.headers.get('Origin')!==`https://${PRODUCTION_HOST}` || !['same-origin',null].includes(request.headers.get('Sec-Fetch-Site'))) return json({error:'origin'},403);
  if (request.headers.get('DNT')==='1' || request.headers.get('Sec-GPC')==='1') return new Response(null,{status:204,headers});
  if (!configured(context)) return json({error:'unavailable'},503);
  if (!/^(application\/json|text\/plain)(;|$)/i.test(request.headers.get('Content-Type')||'')) return json({error:'content_type'},415);
  let event;
  try {event=validateEvent(JSON.parse(await readLimited(request)));} catch {return json({error:'invalid_event'},400);}
  try {
    const db=context.env.FUNNEL_DB, received=new Date().toISOString();
    // A cap limits accidental loops per session; it is not human verification.
    const recent=await db.prepare('SELECT COUNT(*) AS n FROM funnel_events WHERE session_id=? AND received_at>=?').bind(event.session_id,new Date(Date.now()-60_000).toISOString()).first();
    if (recent.n>=60) return json({error:'rate_limit'},429);
    await db.prepare(`INSERT OR IGNORE INTO funnel_events (${EVENT_COLUMNS.join(',')},received_at) VALUES (${[...EVENT_COLUMNS,'received_at'].map(()=>'?').join(',')})`).bind(...EVENT_COLUMNS.map(key=>event[key]),received).run();
    return new Response(null,{status:204,headers});
  } catch {return json({error:'unavailable'},503);}
}
