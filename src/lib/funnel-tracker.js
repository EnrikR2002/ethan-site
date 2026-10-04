import { PAGE_PATHS, STUDY_IDS, PLACEMENTS, PRODUCTION_HOST, normalizePage, classifyLink } from './funnel-schema.js';

const SESSION_KEY = 'syfer-funnel-session';
const OPTOUT_KEY = 'syfer-funnel-opt-out';
const SESSION_IDLE = 30*60*1000;

function startSource() {
  const tag = new URL(location.href).searchParams.get('utm_source')?.toLowerCase();
  if (tag === 'linkedin') return 'linkedin';
  if (['tech-week','techweek','sf-tech-week'].includes(tag)) return 'tech-week';
  if (tag === 'referral') return 'referral';
  if (tag) return 'other';
  try {
    const ref = new URL(document.referrer);
    if (ref.origin === location.origin) return 'direct';
    if (['linkedin.com','www.linkedin.com'].includes(ref.hostname)) return 'linkedin';
    if (['www.google.com','google.com','www.bing.com','bing.com','duckduckgo.com'].includes(ref.hostname)) return 'search';
    return 'referral';
  } catch { return 'direct'; }
}

export async function startFunnelTracking() {
  const page = normalizePage(location.pathname);
  if (location.hostname !== PRODUCTION_HOST || !PAGE_PATHS.includes(page)) return;
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl) return;
  try {
    const preference = new URL(location.href).searchParams.get('analytics');
    if (preference === 'off') localStorage.setItem(OPTOUT_KEY,'1');
    if (preference === 'on') localStorage.removeItem(OPTOUT_KEY);
    if (localStorage.getItem(OPTOUT_KEY) === '1') return;
  } catch { return; }
  let status;
  try {
    const response = await fetch('/api/funnel/status',{cache:'no-store',credentials:'omit'});
    if (!response.ok) return;
    status = await response.json();
  } catch { return; }
  if (status.ready !== true) return;

  function session() {
    try {
      const now = Date.now(); let data;
      try { data = JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch {}
      if (!data?.id || !data.source || !Number.isFinite(data.last) || now-data.last >= SESSION_IDLE || data.last>now) data = {id:crypto.randomUUID(),source:startSource()};
      data.last=now; sessionStorage.setItem(SESSION_KEY,JSON.stringify(data)); return data;
    } catch { return null; }
  }

  function record(event,destination='',placement='inline',study='') {
    const data = session(); if (!data) return;
    const payload = {event_id:crypto.randomUUID(),session_id:data.id,occurred_at:new Date().toISOString(),event,page,destination,placement:PLACEMENTS.includes(placement)?placement:'inline',source:data.source,device:innerWidth<768?'mobile':innerWidth<1024?'tablet':'desktop',study};
    const body = JSON.stringify(payload);
    // Failure never blocks navigation; retry IDs are not regenerated.
    try { if (navigator.sendBeacon?.('/api/funnel/events',new Blob([body],{type:'text/plain'}))) return; } catch {}
    fetch('/api/funnel/events',{method:'POST',body,headers:{'Content-Type':'text/plain'},keepalive:true,credentials:'omit'}).catch(()=>{});
  }
  record('page_view',page);
  document.addEventListener('click',event=>{
    if (!event.isTrusted || event.defaultPrevented) return;
    const element = event.target instanceof Element ? event.target : event.target?.parentElement;
    const link = element?.closest('a[href]'); if (!link) return;
    const action = classifyLink(link.href,location.origin,link.hasAttribute('download'));
    if (!action) return;
    if (action.destination===page && !['pdf_open','pdf_download','contact_click','fit_call_click'].includes(action.event)) return;
    const placement = link.dataset.placement || (link.closest('header')?'header':link.closest('.profile-next')?'profile-final':link.closest('.mini-case,.compact-work')?'proof':link.closest('nav')?'navigation':'inline');
    record(action.event,action.destination,placement);
  });
  document.querySelectorAll('.study-card details').forEach(details=>{
    const study = details.closest('.study-card')?.id;
    if (!STUDY_IDS.includes(study)) return;
    if (details.open) record('study_open','/case-studies/','case-studies',study);
    details.addEventListener('toggle',()=>{if(details.open)record('study_open','/case-studies/','case-studies',study);});
  });
}
