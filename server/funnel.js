import { PRODUCTION_HOST } from '../src/lib/funnel-schema.js';

export const headers = {'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex'};
export function json(body,status=200) { return new Response(JSON.stringify(body),{status,headers:{...headers,'Content-Type':'application/json'}}); }
export function configured(context) {
  return new URL(context.request.url).hostname === PRODUCTION_HOST && context.env.FUNNEL_ENABLED === 'true' && !!context.env.FUNNEL_DB?.prepare && typeof context.env.FUNNEL_EXPORT_TOKEN==='string' && context.env.FUNNEL_EXPORT_TOKEN.length>=32;
}
export async function ready(context) {
  if (!configured(context)) return false;
  try { await context.env.FUNNEL_DB.prepare('SELECT event_id FROM funnel_events LIMIT 1').all(); return true; } catch { return false; }
}
export async function readLimited(request,max=4096) {
  if (Number(request.headers.get('Content-Length'))>max) throw new Error('Oversize');
  if (!request.body) throw new Error('Empty');
  const reader=request.body.getReader();let chunks=[],size=0;
  for (;;) {const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>max){await reader.cancel();throw new Error('Oversize');}chunks.push(value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
  return new TextDecoder().decode(bytes);
}
export async function authorized(request,secret) {
  const token=request.headers.get('Authorization')?.match(/^Bearer ([^\s]+)$/)?.[1];
  if (!token || token.length>256 || typeof secret!=='string' || secret.length<32) return false;
  const [a,b]=await Promise.all([crypto.subtle.digest('SHA-256',new TextEncoder().encode(token)),crypto.subtle.digest('SHA-256',new TextEncoder().encode(secret))]);
  const x=new Uint8Array(a),y=new Uint8Array(b);let diff=0;for(let i=0;i<x.length;i++)diff|=x[i]^y[i];return diff===0;
}
