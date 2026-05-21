import type { APIRoute } from "astro";

export const prerender = false;

interface LeadPayload {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
  source?: string;
  lang?: string;
  consent?: boolean;
  // honeypot
  website?: string;
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export const POST: APIRoute = async ({ request }) => {
  const webhook = import.meta.env.LEAD_WEBHOOK_URL;
  let body: LeadPayload;

  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid_json" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Honeypot: si rellenan "website" es bot → 200 silencioso
  if (body.website) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  // Validación mínima
  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const email = (body.email ?? "").trim();
  if (name.length < 2) {
    return new Response(JSON.stringify({ ok: false, error: "name_required" }), { status: 400 });
  }
  if (!phone && !email) {
    return new Response(JSON.stringify({ ok: false, error: "contact_required" }), { status: 400 });
  }
  if (email && !isEmail(email)) {
    return new Response(JSON.stringify({ ok: false, error: "invalid_email" }), { status: 400 });
  }

  const payload = {
    name,
    phone,
    email,
    service: (body.service ?? "").trim(),
    message: (body.message ?? "").trim(),
    source: body.source ?? "website",
    lang: body.lang ?? "es",
    consent: !!body.consent,
    user_agent: request.headers.get("user-agent") ?? "",
    referer: request.headers.get("referer") ?? "",
    created_at: new Date().toISOString(),
  };

  if (!webhook) {
    // Fallback: si no hay webhook configurado, devolvemos OK pero logueamos.
    console.warn("[lead] LEAD_WEBHOOK_URL not set, returning ok without forwarding.");
    return new Response(JSON.stringify({ ok: true, forwarded: false, payload }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const r = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      return new Response(JSON.stringify({ ok: false, error: "webhook_failed", status: r.status }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ ok: true, forwarded: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "webhook_error", detail: String(e) }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};
