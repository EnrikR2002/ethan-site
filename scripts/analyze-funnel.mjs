import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { EVENT_NAMES } from '../src/lib/funnel-schema.js';

export const EVENTS = new Set(EVENT_NAMES);
const PAGES = new Set(['/', '/sf-tech-week/', '/consulting/', '/case-studies/', '/offer/', '/resume/']);

// Accept normal CSV exports, including quoted fields, CRLF, and UTF-8 BOM.
export function parseCsv(text) {
  const rows = []; let row = [], cell = '', quoted = false;
  text = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') { cell += '"'; i++; }
      else if (quoted || cell === '') quoted = !quoted;
      else throw new Error('Unexpected quote in CSV field');
    } else if (c === ',' && !quoted) { row.push(cell); cell = ''; }
    else if ((c === '\n' || c === '\r') && !quoted) {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); if (row.some(Boolean)) rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  if (quoted) throw new Error('Unclosed quoted CSV field');
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const headers = rows.shift();
  if (!headers || new Set(headers).size !== headers.length) throw new Error('Missing or duplicate CSV headers');
  return rows.map((values, i) => {
    if (values.length !== headers.length) throw new Error(`CSV row ${i + 2} has the wrong field count`);
    return Object.fromEntries(headers.map((key, n) => [key, values[n]]));
  });
}

export function analyzeEvents(input) {
  if (!Array.isArray(input) || !input.length) throw new Error('No event data supplied; an empty export is not evidence of zero traffic');
  const seen = new Map(), sessions = new Map(); let duplicates = 0;
  input.forEach((raw, index) => {
    for (const key of ['event_id', 'session_id', 'occurred_at', 'event', 'page']) {
      if (typeof raw[key] !== 'string' || !raw[key]) throw new Error(`Row ${index + 1}: missing ${key}`);
    }
    if (!EVENTS.has(raw.event) || !PAGES.has(raw.page)) throw new Error(`Row ${index + 1}: unknown event or page`);
    if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z$/.test(raw.occurred_at) || !Number.isFinite(Date.parse(raw.occurred_at))) throw new Error(`Row ${index + 1}: occurred_at must be an ISO UTC timestamp`);
    const normalized = Object.fromEntries(['event_id','session_id','occurred_at','event','page','destination','placement','source','device','study'].map(key => [key, raw[key] ?? '']));
    const serialized = JSON.stringify(normalized);
    if (seen.has(raw.event_id)) {
      if (seen.get(raw.event_id) !== serialized) throw new Error(`Conflicting duplicate event_id: ${raw.event_id}`);
      duplicates++; return;
    }
    seen.set(raw.event_id, serialized);
    if (!sessions.has(raw.session_id)) sessions.set(raw.session_id, []);
    sessions.get(raw.session_id).push(normalized);
  });
  const groups = [...sessions.values()].map(events => events.sort((a,b) => Date.parse(a.occurred_at) - Date.parse(b.occurred_at)));
  const isProfile = e => e.event === 'page_view' && ['/', '/sf-tech-week/'].includes(e.page);
  const isConsulting = e => e.event === 'page_view' && e.page === '/consulting/';
  const has = test => groups.filter(events => events.some(test)).length;
  // Require a later timestamp; a booking-link click is not a booking.
  const ordered = (first, second) => groups.filter(events => events.some(a => first(a) && events.some(b => second(b) && Date.parse(b.occurred_at) > Date.parse(a.occurred_at)))).length;
  const profileSessions = has(isProfile), consultingSessions = has(isConsulting);
  const profileToConsulting = ordered(isProfile, isConsulting);
  const consultingToCall = ordered(isConsulting, e => e.event === 'fit_call_click');
  const rate = (n,d) => d ? Number((100*n/d).toFixed(2)) : null;
  const unique = [...seen.values()].map(value => JSON.parse(value));
  const daily = [...new Set(unique.map(e => e.occurred_at.slice(0,10)))].sort().map(day => {
    const events = unique.filter(e => e.occurred_at.startsWith(day));
    return {date:day,events:events.length,sessions:new Set(events.map(e => e.session_id)).size,page_views:events.filter(e=>e.event==='page_view').length,fit_call_clicks:events.filter(e=>e.event==='fit_call_click').length};
  });
  const earliest = unique.map(e=>e.occurred_at).sort((a,b)=>Date.parse(a)-Date.parse(b));
  const sources = [...new Set(groups.map(events=>events[0].source||'unknown'))].sort().map(source=>{
    const cohort=groups.filter(events=>(events[0].source||'unknown')===source);
    return {source,sessions:cohort.length,consulting_sessions:cohort.filter(events=>events.some(isConsulting)).length,fit_call_click_sessions:cohort.filter(events=>events.some(e=>e.event==='fit_call_click')).length};
  });
  const study_opens = [...new Set(unique.filter(e=>e.event==='study_open').map(e=>e.study))].sort().map(study=>{
    const events=unique.filter(e=>e.event==='study_open'&&e.study===study);
    return {study,open_events:events.length,sessions:new Set(events.map(e=>e.session_id)).size};
  });
  return {
    period:{from:earliest[0],to:earliest.at(-1)}, events:unique.length, duplicate_rows_ignored:duplicates,
    sessions:groups.length, page_views:unique.filter(e=>e.event==='page_view').length,
    profile_sessions:profileSessions, consulting_sessions:consultingSessions,
    case_study_sessions:has(e=>e.event==='page_view'&&e.page==='/case-studies/'),
    offer_sessions:has(e=>e.event==='page_view'&&e.page==='/offer/'),
    resume_sessions:has(e=>e.event==='page_view'&&e.page==='/resume/'),
    fit_call_clicks:unique.filter(e=>e.event==='fit_call_click').length,
    fit_call_click_sessions:has(e=>e.event==='fit_call_click'),
    profile_then_consulting_sessions:profileToConsulting,
    profile_to_consulting_percent:rate(profileToConsulting,profileSessions),
    consulting_then_fit_call_click_sessions:consultingToCall,
    consulting_to_fit_call_click_percent:rate(consultingToCall,consultingSessions),
    completed_bookings:null, sprint_sales:null, daily, sources, study_opens,
    limits:['Sessions must use the collector\'s stated session definition; they are not unique people.', 'Ordered paths are limited to the supplied export window.', 'Daily sessions must not be summed into an overall unique-session count.', 'Fit Call clicks do not establish completed bookings or sales.', 'Tracking gaps, blocked requests and internal/test traffic affect counts.', 'Observed paths do not prove that case studies or offers caused conversion.'],
  };
}

export function reportMarkdown(r) {
  const pct = n => n === null ? 'N/A' : `${n}%`;
  return `# Funnel report\n\nPeriod: ${r.period.from} to ${r.period.to}\n\n## Counts first\n\n| Measure | Count |\n| --- | ---: |\n| Sessions | ${r.sessions} |\n| Page views | ${r.page_views} |\n| Profile sessions | ${r.profile_sessions} |\n| Consulting sessions | ${r.consulting_sessions} |\n| Case Studies sessions | ${r.case_study_sessions} |\n| Offer sessions | ${r.offer_sessions} |\n| Resume sessions | ${r.resume_sessions} |\n| Fit Call clicks | ${r.fit_call_clicks} |\n| Sessions with a Fit Call click | ${r.fit_call_click_sessions} |\n\n## Observed paths\n\n- Profile then consulting: ${r.profile_then_consulting_sessions}/${r.profile_sessions} sessions (${pct(r.profile_to_consulting_percent)}).\n- Consulting then Fit Call click: ${r.consulting_then_fit_call_click_sessions}/${r.consulting_sessions} sessions (${pct(r.consulting_to_fit_call_click_percent)}).\n- Completed bookings: unavailable from site clicks.\n- Sprint sales: unavailable from site clicks.\n\n## Data checks and limits\n\n${r.events} unique events; ${r.duplicate_rows_ignored} exact duplicate rows ignored.\n\n${r.limits.map(t=>`- ${t}`).join('\n')}\n`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const [inputPath, outputPath] = process.argv.slice(2);
    if (!inputPath || !outputPath) throw new Error('Usage: node scripts/analyze-funnel.mjs <events.csv|events.json> <private-output-directory>');
    const input = await readFile(inputPath,'utf8');
    const report = analyzeEvents(inputPath.toLowerCase().endsWith('.json') ? JSON.parse(input) : parseCsv(input));
    const output = resolve(outputPath); await mkdir(output,{recursive:true});
    await writeFile(join(output,'funnel-summary.json'),JSON.stringify(report,null,2)+'\n');
    await writeFile(join(output,'funnel-report.md'),reportMarkdown(report));
    await writeFile(join(output,'daily-counts.csv'),'date,events,sessions,page_views,fit_call_clicks\n'+report.daily.map(row=>Object.values(row).join(',')).join('\n')+'\n');
    await writeFile(join(output,'chatgpt-analysis-prompt.txt'),'Analyze the attached funnel-summary.json and funnel-report.md. Start with counts, sample size and collection limits. Separate observed behavior from hypotheses. Do not infer causality, unique people, completed bookings or sales from clicks. Identify the strongest observed drop-off and propose one test with a metric, denominator and next-decision rule. Do not call small samples conclusive.\n');
    console.log(`Report written to ${output}. ${report.sessions} sessions, ${report.events} unique events. No completed bookings inferred.`);
  } catch (error) { console.error(error.message); process.exitCode=1; }
}
