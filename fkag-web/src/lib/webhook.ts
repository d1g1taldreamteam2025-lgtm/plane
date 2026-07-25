/**
 * Envío de formularios (leads) al webhook de n8n.
 * Un solo punto de entrada; el campo `form_type` enruta en n8n.
 */
import { site } from '../config/site';

export type FormType =
  | 'contact'
  | 'newsletter'
  | 'financing'
  | 'financing_quick'
  | 'reserve'
  | 'quote'
  | 'question'
  | 'testdrive';

export interface LeadPayload {
  form_type: FormType;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  vehicle_id?: string;
  vehicle_title?: string;
  preferred_date?: string;
  raw_fields?: Record<string, unknown>;
  _source_url?: string;
  _submitted_at?: string;
  _lang?: string;
  [key: string]: unknown;
}

/** URL del webhook, disponible también para scripts inline del cliente. */
export const WEBHOOK_URL = site.webhookUrl;

export async function sendLead(payload: LeadPayload): Promise<boolean> {
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _submitted_at: new Date().toISOString(),
        ...payload,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error('[webhook] error:', err);
    return false;
  }
}
