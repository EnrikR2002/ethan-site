export const EVENT_NAMES = ['page_view','consulting_click','case_studies_click','offer_click','resume_click','fit_call_click','pdf_open','pdf_download','contact_click','study_open'];
export const PAGE_PATHS = ['/', '/sf-tech-week/', '/consulting/', '/case-studies/', '/offer/', '/resume/'];
export const STUDY_IDS = ['tansavatdi','yamikaze','mma','yozu','memesbreakcore','syfer-music','content-intelligence'];
export const SOURCES = ['direct','linkedin','tech-week','referral','search','other'];
export const DEVICES = ['mobile','tablet','desktop'];
export const PLACEMENTS = ['header','hero','final','offer','case-studies','navigation','proof','inline','profile-final','resume','pdf'];
export const DESTINATIONS = [...PAGE_PATHS,'calendly','email','linkedin','offer-pdf','resume-pdf',''];
export const EVENT_COLUMNS = ['event_id','session_id','occurred_at','event','page','destination','placement','source','device','study'];
export const PRODUCTION_HOST = 'syfer-media.pages.dev';
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

export const normalizePage = path => path === '/' ? '/' : path.replace(/\/+$/, '') + '/';

export function validateEvent(input, now = Date.now()) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid event');
  if (!UUID.test(input.event_id) || !UUID.test(input.session_id)) throw new Error('Invalid IDs');
  if (!EVENT_NAMES.includes(input.event) || !PAGE_PATHS.includes(input.page)) throw new Error('Invalid event or page');
  const time = Date.parse(input.occurred_at);
  if (typeof input.occurred_at !== 'string' || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(input.occurred_at) || !Number.isFinite(time) || time > now+300_000 || time < now-3_600_000) throw new Error('Invalid timestamp');
  if (!SOURCES.includes(input.source) || !DEVICES.includes(input.device) || !PLACEMENTS.includes(input.placement) || !DESTINATIONS.includes(input.destination)) throw new Error('Invalid dimensions');
  if (input.study !== '' && !STUDY_IDS.includes(input.study)) throw new Error('Invalid study');
  if (input.event === 'study_open' && !input.study) throw new Error('Study required');
  // Explicit projection discards unsolicited fields such as IP, email or URL.
  return Object.fromEntries(EVENT_COLUMNS.map(key => [key, input[key]]));
}

export function classifyLink(href, origin, download = false) {
  let url; try { url = new URL(href,origin); } catch { return null; }
  if (url.protocol === 'mailto:') return {event:'contact_click',destination:'email'};
  if (url.hostname === 'calendly.com' && url.pathname === '/miningspartan2/1-hour-consulting') return {event:'fit_call_click',destination:'calendly'};
  if (['linkedin.com','www.linkedin.com'].includes(url.hostname)) return {event:'contact_click',destination:'linkedin'};
  if (url.origin !== origin) return null;
  const pdf = {'/growth-bottleneck-sprint.pdf':'offer-pdf','/ethan-alfandary-resume.pdf':'resume-pdf'}[url.pathname];
  if (pdf) return {event:download?'pdf_download':'pdf_open',destination:pdf};
  const page = normalizePage(url.pathname);
  const event = {'/consulting/':'consulting_click','/case-studies/':'case_studies_click','/offer/':'offer_click','/resume/':'resume_click'}[page];
  return event ? {event,destination:page} : null;
}
