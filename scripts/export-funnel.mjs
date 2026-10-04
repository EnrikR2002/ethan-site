import { mkdir, writeFile, rename } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { EVENT_COLUMNS } from '../src/lib/funnel-schema.js';

try {
  const [directory, fromArg, toArg] = process.argv.slice(2);
  const token = process.env.FUNNEL_EXPORT_TOKEN;
  if (!directory || !token || token.length<32) throw new Error('Usage: set FUNNEL_EXPORT_TOKEN privately, then node scripts/export-funnel.mjs <private-directory> [from YYYY-MM-DD] [to YYYY-MM-DD]');
  const now=new Date(),from=fromArg||new Date(now.valueOf()-6*86400_000).toISOString().slice(0,10),to=toArg||now.toISOString().slice(0,10);
  if (![from,to].every(s=>/^\d{4}-\d\d-\d\d$/.test(s))) throw new Error('Dates must use YYYY-MM-DD');
  const rows=[], seen=new Set();let cursor=null;
  do {
    if (seen.size>=1000) throw new Error('Export too large; choose a shorter date range');
    const url=new URL('https://syfer-media.pages.dev/api/funnel/export');url.searchParams.set('from',from);url.searchParams.set('to',to);if(cursor)url.searchParams.set('cursor',cursor);
    const response=await fetch(url,{headers:{Authorization:`Bearer ${token}`},redirect:'error',signal:AbortSignal.timeout(30000)});
    if (!response.ok) throw new Error(`Export unavailable (HTTP ${response.status}); check storage readiness and the private token`);
    const page=await response.json();if(!Array.isArray(page.events))throw new Error('Invalid export response');
    rows.push(...page.events);cursor=page.next_cursor;
    if(cursor){if(typeof cursor!=='string'||seen.has(cursor))throw new Error('Repeated export cursor');seen.add(cursor);}
  } while(cursor);
  const quote=value=>'"'+String(value??'').replaceAll('"','""')+'"';
  const csv=EVENT_COLUMNS.join(',')+'\n'+rows.map(row=>EVENT_COLUMNS.map(column=>quote(row[column])).join(',')).join('\n')+'\n';
  const output=resolve(directory);await mkdir(output,{recursive:true});
  const target=join(output,`events-${from}-${to}.csv`);await writeFile(target+'.tmp',csv);await rename(target+'.tmp',target);
  console.log(`${rows.length} event rows exported to ${target}. No token was saved.`);
} catch(error) {console.error(error.message);process.exitCode=1;}
