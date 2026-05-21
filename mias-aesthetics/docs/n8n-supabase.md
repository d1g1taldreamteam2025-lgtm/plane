# Integración con n8n + Supabase

El sitio postea cada formulario de contacto a `POST /api/lead`. Esa función:

1. Valida los campos (nombre, teléfono O email, formato de email, honeypot anti-spam).
2. Reenvía el JSON al webhook de n8n definido en la variable de entorno `LEAD_WEBHOOK_URL`.
3. Devuelve `{ ok: true }` al sitio para mostrar el mensaje de éxito.

## 1. SQL para Supabase

Ejecutá esto **una sola vez** en el **SQL Editor** de Supabase
(proyecto que ya tenés conectado con credencial `B 2026` en n8n).

```sql
-- Tabla de leads que llegan desde el formulario del sitio
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text,
  email       text,
  service     text,
  message     text,
  source      text,        -- p.ej. "/", "/servicios/botox"
  lang        text,        -- "es" | "en"
  consent     boolean default false,
  user_agent  text,
  referer     text,
  created_at  timestamptz default now(),
  status      text default 'new'   -- new | contacted | booked | closed
);

create index if not exists idx_leads_created_at on public.leads (created_at desc);
create index if not exists idx_leads_status     on public.leads (status);

-- Tabla opcional para futuras reservas confirmadas
create table if not exists public.bookings (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid references public.leads(id) on delete set null,
  client_name   text not null,
  service       text not null,
  scheduled_at  timestamptz,
  notes         text,
  status        text default 'pending', -- pending | confirmed | done | canceled
  created_at    timestamptz default now()
);
```

## 2. Workflow n8n

### Nodos del workflow

```
[Webhook] → [Postgres: insert lead] → [WhatsApp / Email notificación] → [Respond to Webhook]
```

### 2.1 Webhook node

- **HTTP Method**: POST
- **Path**: `mia-lead` (cualquier nombre único)
- **Authentication**: None (validamos en el sitio con honeypot)
- **Respond**: Using Respond to Webhook node

Copiá la URL del webhook (la que termina en `/webhook/mia-lead`).

### 2.2 Postgres node — Insert lead

- **Credential**: B 2026 (la que ya tenés)
- **Operation**: Insert
- **Schema**: public
- **Table**: leads
- **Columns** (mapeo desde el body del webhook):
  - `name` ← `{{ $json.body.name }}`
  - `phone` ← `{{ $json.body.phone }}`
  - `email` ← `{{ $json.body.email }}`
  - `service` ← `{{ $json.body.service }}`
  - `message` ← `{{ $json.body.message }}`
  - `source` ← `{{ $json.body.source }}`
  - `lang` ← `{{ $json.body.lang }}`
  - `consent` ← `{{ $json.body.consent }}`
  - `user_agent` ← `{{ $json.body.user_agent }}`
  - `referer` ← `{{ $json.body.referer }}`

### 2.3 Notificación (opcional)

Agregá un nodo de WhatsApp Business, Telegram o Email para
avisarle a Erlym apenas llega un lead. Ej. mensaje:

```
🌸 Nueva consulta en miasaesthetics.com

Nombre: {{ $('Webhook').item.json.body.name }}
Teléfono: {{ $('Webhook').item.json.body.phone }}
Servicio: {{ $('Webhook').item.json.body.service || "Sin definir" }}
Mensaje: {{ $('Webhook').item.json.body.message || "—" }}

Fuente: {{ $('Webhook').item.json.body.source }}
```

### 2.4 Respond to Webhook

- **Respond With**: JSON
- **Response Body**: `{ "ok": true }`

## 3. Variable de entorno en Vercel

En Vercel → tu proyecto → **Settings → Environment Variables**:

| Key                | Value                            | Environments        |
| :----------------- | :------------------------------- | :------------------ |
| `LEAD_WEBHOOK_URL` | (URL pública del webhook de n8n) | Production, Preview |

Después de guardarla, hacé **Redeploy** desde Deployments para que tome la variable.

## 4. Probarlo

Una vez configurado:

1. Andá al sitio
2. Bajá a la sección "Te llamamos nosotras"
3. Completá y enviá
4. Verificá que aparece el row nuevo en Supabase → Table Editor → leads
5. Verificá la notificación de n8n
