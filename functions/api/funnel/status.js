import { ready, json } from '../../../server/funnel.js';
export async function onRequestGet(context) { return json({ready:await ready(context)}); }
