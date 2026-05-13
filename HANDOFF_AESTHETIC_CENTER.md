# 📘 GIGA DOCUMENTO DE HANDOFF — De FKAG (WordPress/Elementor) a Centro Estético (VS Code)

> Este documento resume **todo lo aprendido** construyendo el sitio de Family Key Auto Group y traduce esos patrones para un nuevo proyecto de un **centro estético en USA** desarrollado en **Visual Studio Code** (stack moderno, sin WordPress).
>
> El siguiente chat de Claude debería leer este doc completo antes de empezar.

---

## 0. Contexto rápido

- **Proyecto previo**: FKAG (concesionario de autos usados en Hollywood/Rialto FL). Built en WordPress + Elementor pegando widgets HTML/CSS/JS auto-contenidos.
- **Proyecto nuevo**: Sitio para centro estético en USA. Stack libre — recomendamos algo moderno y rápido (ver §10).
- **Herramientas instaladas del usuario** (probables): Node.js, Git, VS Code, Claude Code CLI.
- **Preferencias del usuario**: prefiere ver el código y entender qué pasa, en vez de que el agente trabaje a ciegas en terminal. Es pragmático, impaciente con explicaciones largas, le gustan respuestas en español y reemplazos completos de archivos (no parches quirúrgicos en su archivo).

---

## 1. Stack que usamos en FKAG (y por qué)

| Capa | Tecnología | Por qué |
|---|---|---|
| Hosting/CMS | WordPress + Elementor (Pro) | Cliente lo pidió, ya tenían |
| UI | Widgets HTML/CSS/JS pegados en cajas HTML de Elementor | Control total sin pelear con el theme |
| Fuentes | Inter + Poppins + Material Icons Outlined (Google Fonts CDN) | Gratis, rápidas |
| Backend datos | Supabase (Postgres + REST API) | Lecturas anónimas con anon key |
| Webhooks/Automation | n8n self-hosted | Manejo de leads, PDFs, email, WhatsApp |
| Imágenes | Cloudinary | CDN, optimización automática |
| WhatsApp | Evolution API (self-hosted) | Envío de mensajes/archivos |
| Email | Gmail SMTP (vía nodo n8n) | Envío de adjuntos PDF |
| Mapas | OpenStreetMap embed iframe | Sin API key, gratis |
| i18n | localStorage `fkag_lang` + CustomEvent | Bilingüe ES/EN sin librerías |

### Limitaciones que sufrimos
- **Elementor mete márgenes/paddings invisibles** entre widgets HTML → línea blanca/gap entre secciones. Solución: CSS `:has()` para neutralizar.
- **n8n Task Runners bloquean módulos externos** (`pdfkit` no disponible). Solución: PDF puro en JS con Buffer + tablas de Helvetica.
- **Brave/Chrome `:focus`/`:active` pintan botones morado**. Solución: blindar con `outline:none !important; background:... !important` en `:focus, :focus-visible, :active`.
- **CORS de iframe de OSM**: si tu script reinyecta el div, el i18n puede borrar el iframe. Solución: poner `data-i18n` en un `<span>` interior, no en el contenedor.
- **Binary data se "consume" en n8n** entre nodos. Solución: usar `json.pdf_base64` para nodos posteriores que no necesiten el binary.

---

## 2. Lecciones doradas (no las olvides nunca)

1. **Widgets self-contained > globales**. Cada widget trae su propio CSS, JS y diccionario i18n. Si lo mueves a otra página, sigue funcionando solo.
2. **i18n con `localStorage` + `CustomEvent`** es suficiente para ES/EN. No necesitas i18next ni nada pesado. Patrón:
   - El header dispara `window.dispatchEvent(new CustomEvent('fkag-lang-change', {detail:{lang:'en'}}))` y guarda en `localStorage.fkag_lang`.
   - Cada widget escucha ese evento + tiene fallback que mira `localStorage` después de un click en `.lang-btn`.
3. **Toda submission de form → un solo webhook con `form_type`**. Centraliza la lógica en n8n con un IF gigantesco que rutea por `form_type`.
4. **URL params como deep linking** (`?filter=under-20k`, `?make=Toyota`). El widget detecta el param al cargar y activa el filtro correspondiente. Permite linkear desde otros widgets/páginas.
5. **Loading → Success → Error states siempre visibles**. El usuario tiene que saber qué está pasando. Botón cambia texto a "Enviando...", muestra checkmark al éxito, muestra error si falla.
6. **CSS `text-transform:capitalize`** salva a la base de datos llena de minúsculas. Útil para campos como `transmission: "continuously variable automatic"`.
7. **`align-items:start`** en grids cuando una columna es más alta que otra evita que la chica se estire con espacio en blanco.
8. **PDF en JS puro** es factible y deja independencia total de servicios externos. Usa tablas Helvetica + content streams.
9. **No confíes en que las imágenes carguen**. Pon siempre `onerror` con fallback. Filtra URLs vacías antes de renderizar thumbs.
10. **No pongas `data-i18n` en contenedores que JS va a manipular**. Pónlo en spans hijos.

---

## 3. Sistema de diseño usado en FKAG

### Paleta
```css
--gold:        #c9a961;  /* primary accent */
--gold-hover:  #d4b674;
--gold-dark:   #a88a47;
--black:       #0a0a0a;  /* hero bg, dark sections */
--ink:         #0c0c0c;  /* text dark */
--gray-text:   #5b6b7c;
--bg-light:    #f5f7fa;
--bg-card:     #ffffff;
--border:      #e8e4dc;
--success:     #2f7d4f;
--error:       #c0392b;
```

### Tipografía
- **Headings**: `Poppins`, 700–800 weight, letter-spacing tight (-0.2 a -1.2px).
- **Body**: `Inter`, 400–600.
- **Stats/numbers**: `Poppins` 800.

### Componentes recurrentes
- **Card**: `background:#fff; border-radius:14-16px; padding:24-28px; box-shadow:0 2-6px 12-20px rgba(0,0,0,.06)`.
- **CTA Primary**: gradiente dorado `linear-gradient(135deg,#c9a961,#d4b674)`, texto `#0c0c0c`, padding 14px 22px, `font-weight:700; text-transform:uppercase; letter-spacing:.5px`.
- **CTA Secondary**: outline negro `border:2px solid #0c0c0c; background:transparent; color:#0c0c0c`.
- **Eyebrow** (etiqueta sobre títulos): `font-size:12px; font-weight:800; letter-spacing:2px; text-transform:uppercase; color:#c9a961; background:rgba(201,169,97,.12); padding:6px 14px; border-radius:99px`.
- **Hero**: gradiente oscuro `linear-gradient(135deg,#0c0c0c 0%,#1a1a1a 100%)` + opcional imagen de fondo con overlay `rgba(12,12,12,.88)`.
- **Divider marquee**: barra horizontal con texto repetido en uppercase, fondo dorado o negro.

### Spacing scale
8 / 14 / 18 / 24 / 28 / 36 / 48 / 60 / 80 / 90 px

---

## 4. Patrones de código reutilizables (copy/paste)

### 4.1 Patrón i18n self-contained
```html
<script>
(function(){
  var LANG = (function(){
    try { var x = localStorage.getItem('app_lang'); return (x==='en'||x==='es') ? x : 'es'; }
    catch(e){ return 'es'; }
  })();
  var TR = {
    hero_title: { en:'Welcome', es:'Bienvenido' },
    cta_book:   { en:'Book Now', es:'Reservar' }
    // ... rest
  };
  function t(k){ return TR[k] ? (TR[k][LANG]||TR[k].en) : k; }
  function applyTr(){
    document.querySelectorAll('.my-widget [data-i18n]').forEach(function(el){
      var k = el.getAttribute('data-i18n');
      if (TR[k]) el.innerHTML = t(k);
    });
    document.querySelectorAll('.my-widget [data-i18n-placeholder]').forEach(function(el){
      var k = el.getAttribute('data-i18n-placeholder');
      if (TR[k]) el.setAttribute('placeholder', t(k));
    });
  }
  applyTr();
  window.addEventListener('app-lang-change', function(e){
    var nl = (e.detail && e.detail.lang) || LANG;
    if (nl === LANG) return;
    LANG = nl;
    applyTr();
  });
  // Fallback: si otro widget tocó localStorage sin disparar evento
  document.addEventListener('click', function(e){
    if (!e.target.closest('.lang-btn,[data-lang]')) return;
    setTimeout(function(){
      try {
        var nl = localStorage.getItem('app_lang');
        if ((nl==='en'||nl==='es') && nl !== LANG) { LANG = nl; applyTr(); }
      } catch(e){}
    }, 200);
  });
})();
</script>
```

### 4.2 Patrón form submit a webhook con estados
```js
form.addEventListener('submit', async function(e){
  e.preventDefault();
  var btn = form.querySelector('button[type=submit]');
  var errBox = form.querySelector('.form-error');
  var wrap = form.closest('.form-card');

  if (errBox) errBox.style.display = 'none';
  if (btn) { btn.disabled = true; btn.textContent = t('sending'); }

  var d = {};
  new FormData(form).forEach((v,k) => d[k] = v);

  var payload = {
    form_type: 'contact',
    name: d.first_name + ' ' + d.last_name,
    email: d.email,
    phone: d.phone,
    message: d.message,
    _source_url: location.href,
    _submitted_at: new Date().toISOString(),
    _lang: LANG
  };

  try {
    var r = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    wrap.innerHTML = '<div class="success"><h3>✓ ' + t('thank_you') + '</h3><p>' + t('we_contact_you') + '</p></div>';
    wrap.scrollIntoView({behavior:'smooth', block:'center'});
  } catch(err) {
    console.error(err);
    if (errBox) errBox.style.display = 'block';
    if (btn) { btn.disabled = false; btn.textContent = t('send'); }
  }
});
```

### 4.3 Patrón galería con onerror + filter URLs vacías
```js
function buildGallery(item){
  var isValid = u => u && typeof u === 'string' && u.trim().length > 5;
  var photos = (item.gallery || []).filter(isValid);
  return photos.length ? photos : [DEFAULT_PLACEHOLDER];
}

// Render con error handler
gallery.map((src,i) => `
  <button class="thumb${i===0?' active':''}" data-idx="${i}">
    <img src="${src}" alt="Photo ${i+1}"
         onerror="this.closest('.thumb').style.display='none'" />
  </button>
`).join('');

// Main image fallback
`<img id="mainImg" src="${gallery[0]}"
      onerror="this.src='https://via.placeholder.com/900x600?text=No+Photo'" />`
```

### 4.4 Patrón deep link via URL params
```js
// Al cargar el widget
var url = new URLSearchParams(window.location.search);
if (url.get('filter')) state.quick = url.get('filter');

// Al hacer click en un quick filter
btn.addEventListener('click', () => {
  state.quick = btn.dataset.quick;
  render();
  var u = new URL(location.href);
  if (state.quick === 'all') u.searchParams.delete('filter');
  else u.searchParams.set('filter', state.quick);
  history.replaceState({}, '', u.toString());
});
```

### 4.5 Patrón map embed con i18n-safe
```html
<!-- el data-i18n va en el span INTERIOR, no en el contenedor -->
<div class="mapbox" data-osm-bbox="-117.4,34.08,-117.34,34.13" data-osm-marker="34.10,-117.37">
  <span data-i18n="map_loading">Loading map…</span>
</div>

<script>
function mountMap(){
  var box = document.querySelector('.mapbox');
  if (!box || box.querySelector('iframe')) return; // idempotente
  var bbox = box.dataset.osmBbox, marker = box.dataset.osmMarker;
  var src = 'https://www.openstreetmap.org/export/embed.html?bbox='
    + encodeURIComponent(bbox) + '&layer=mapnik&marker=' + encodeURIComponent(marker);
  var f = document.createElement('iframe');
  f.src = src; f.loading = 'lazy';
  f.style.cssText = 'width:100%;height:360px;border:0;display:block;';
  box.innerHTML = '';
  box.appendChild(f);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountMap);
else mountMap();
window.addEventListener('app-lang-change', () => setTimeout(mountMap, 50));
</script>
```

### 4.6 Patrón carrusel hero con switch idioma + mobile
```html
<div class="hero-slide active"
     data-img-es="https://.../slide-es.png"
     data-img-en="https://.../slide-en.png"
     data-img-es-mobile="https://.../slide-es-m.png"
     data-img-en-mobile="https://.../slide-en-m.png"></div>

<script>
function getLang(){
  try { var s = localStorage.getItem('app_lang'); return (s==='es'||s==='en') ? s : 'es'; }
  catch(e){ return 'es'; }
}
function isMobile(){ return window.innerWidth < 768; }
function applyImages(){
  var lang = getLang(), m = isMobile();
  document.querySelectorAll('.hero-slide').forEach(s => {
    var key = (m ? 'data-img-'+lang+'-mobile' : 'data-img-'+lang);
    var url = s.getAttribute(key) || s.getAttribute('data-img-'+lang);
    if (url) s.style.backgroundImage = `url('${url}')`;
  });
}
applyImages();
window.addEventListener('resize', applyImages);
window.addEventListener('app-lang-change', applyImages);
// Auto-rotate
var idx = 0, slides = document.querySelectorAll('.hero-slide');
setInterval(() => {
  idx = (idx + 1) % slides.length;
  slides.forEach((s,i) => s.classList.toggle('active', i === idx));
}, 5000);
</script>
```

### 4.7 Patrón modal accesible
```html
<div class="modal" id="myModal" role="dialog" aria-modal="true">
  <div class="modal__bg" data-modal-close></div>
  <div class="modal__box">
    <button class="modal__x" data-modal-close aria-label="Close">×</button>
    <!-- contenido -->
  </div>
</div>

<script>
function openModal(){ document.getElementById('myModal').classList.add('open'); document.body.style.overflow='hidden'; }
function closeModal(){ document.getElementById('myModal').classList.remove('open'); document.body.style.overflow=''; }
document.addEventListener('click', e => { if (e.target.hasAttribute('data-modal-close')) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
</script>

<style>
.modal{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;padding:16px;}
.modal.open{display:flex;}
.modal__bg{position:absolute;inset:0;background:rgba(0,0,0,.65);backdrop-filter:blur(4px);}
.modal__box{position:relative;background:#fff;border-radius:16px;padding:32px;max-width:480px;width:100%;max-height:90vh;overflow-y:auto;}
.modal__x{position:absolute;top:12px;right:12px;background:#f5f5f5;border:0;width:36px;height:36px;border-radius:50%;font-size:22px;cursor:pointer;}
</style>
```

### 4.8 Patrón button focus blindado (anti morado de Brave)
```css
.btn,
.btn:focus,
.btn:focus-visible,
.btn:active{
  background: var(--btn-bg) !important;
  color: var(--btn-color) !important;
  outline: none !important;
  box-shadow: none !important;
  -webkit-tap-highlight-color: transparent !important;
}
.btn:hover{ background: var(--btn-hover) !important; }
```

### 4.9 Patrón spec rows que no se desbordan
```css
.spec-row{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:12px;
  padding:11px 0;
  line-height:1.45;
}
.spec-lbl{ color:#666; flex-shrink:0; white-space:nowrap; }
.spec-val{
  font-weight:600;
  color:#0c0c0c;
  text-align:right;
  min-width:0;
  word-break:break-word;
  text-transform:capitalize;
}
```

---

## 5. Integraciones backend

### 5.1 Supabase (tabla pública lectura)
```js
const SUPABASE_URL = 'https://your-instance.supabase.co';
const SUPABASE_KEY = 'eyJhbGc...'; // anon key, pública pero limita con RLS

async function getAll(table){
  var res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&order=created_at.desc`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  });
  return res.ok ? res.json() : [];
}
async function getOne(table, id){
  var res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}&select=*`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  });
  if (!res.ok) return null;
  var rows = await res.json();
  return rows[0] || null;
}
```

**RLS importante**: en Supabase activa Row Level Security y crea policy:
- `SELECT` allow all en tablas públicas (inventario, servicios)
- `INSERT` allow all (con rate limit) en tablas de leads/inquiries
- Nada de UPDATE/DELETE para anon

### 5.2 n8n webhook genérico
- **Webhook node** recibe POST con `{ form_type, name, email, phone, ... }`.
- **IF node** rutea por `form_type` (contact, booking, financing_quick, newsletter, vehicle_inquiry, ...).
- **Supabase node** inserta en `inquiries` con `status='new'`.
- **Gmail/SMTP node** envía email al staff (template HTML).
- **HTTP node (Evolution API)** envía WhatsApp al cliente + interno.
- **Webhook Response node** retorna `{ok:true}`.

Para PDFs:
- **Function node** genera PDF puro JS con Buffer, expone tanto `binary.data` (para Gmail attachment) como `json.pdf_base64` (para nodos HTTP).
- **Orden crítico**: Build PDF → Send Email (consume binary) → Send WhatsApp (usa pdf_base64) → Respond OK.

### 5.3 Evolution API (WhatsApp)
```js
// sendText
POST {EVO_URL}/message/sendText/{instance}
Headers: { apikey: '...', 'Content-Type': 'application/json' }
Body: { number: '19495147366', text: 'Hola...' }

// sendMedia (base64)
POST {EVO_URL}/message/sendMedia/{instance}
Body: { number: '...', mediatype: 'document', media: '<base64>', fileName: 'app.pdf' }
```

### 5.4 PDF puro JS (sin librerías)
Patrón básico — usa anchos Helvetica para centrar texto:
```js
const HB = { /* widths Helvetica Bold por char code */ };
const HR = { /* widths Helvetica Regular */ };
function textWidth(s, tbl, size){ let w=0; for(const c of s) w += (tbl[c.charCodeAt(0)]||500); return w*size/1000; }
function centerX(s, tbl, size, pageW){ return (pageW - textWidth(s,tbl,size)) / 2; }
// luego construyes content stream: "BT /F1 14 Tf x y Td (text) Tj ET"
// y un xref table al final con offsets de cada object
```
(Es laborioso. Si en el nuevo proyecto puedes usar npm, usa **`pdfkit`** o **`@pdfme/generator`** y olvida esto.)

### 5.5 Cloudinary
```html
<!-- transformaciones inline en la URL -->
<img src="https://res.cloudinary.com/{cloud}/image/upload/c_fill,w_800,h_600,q_auto,f_auto/v123/photo.jpg">
```
`q_auto,f_auto` = formato y calidad automáticos (WebP en navegadores compatibles).

---

## 6. Bugs comunes que ya resolvimos (evítalos)

| Bug | Causa | Fix |
|---|---|---|
| Mapa OSM se borra al cambiar idioma | `data-i18n` en el div del mapa, i18n hace `el.innerHTML = ...` | Mover `data-i18n` a un `<span>` hijo |
| Línea blanca entre secciones Elementor | Margin/padding default de widgets | CSS `:has()` + `margin:0!important` en wrappers |
| Botones se ven morado al click en Brave | `:focus`/`:active` de UA o theme | Override con `!important` en todos los estados |
| `?price=under-20k` no filtra | Widget lee `?filter=` no `?price=` | Cambiar href a `?filter=under-20k` |
| Transmisión se desborda y choca con label | Flex sin gap, valor más largo que columna | `align-items:flex-start; gap:12px`; `text-align:right; word-break:break-word` en valor |
| Sección "Other Vehicles" deja hueco a la derecha | `repeat(auto-fill, minmax(...))` cuando solo hay 3 cards | `repeat(3, minmax(0,1fr))` |
| Galería con thumbs vacías | DB tiene URLs vacías o rotas | Filter `isValid(u)` + `onerror` handler |
| Pre-qualify CTA del home no filtra | Era el mismo problema de `?price=` | Cambiar a `?filter=under-20k` |
| Slide equivocado reemplazado | Asumir que slide 1 = lo que se ve | Confirmar con el usuario cuál de N |
| PDF n8n falla con `Module pdfkit disallowed` | Task runner bloquea npm modules | Escribir PDF en JS puro con Buffer |
| Email node falla "no binary data" | HTTP request anterior lo consumió | Reordenar: Email antes que HTTP |
| Línea blanca debajo de la galería VDP | Grid stretching la card chica para igualar la grande | `align-items:start` en `.fkag-vdp__top` |

---

## 7. Cómo brindar el nuevo proyecto (centro estético)

Antes de tirar línea de código, pregúntale al cliente / al usuario:

1. **Nombre del centro + ciudad + estado USA**.
2. **Servicios principales** (3-8 servicios estrella): ej. Botox, fillers, láser, peeling, masajes, faciales, lipo no invasiva, depilación láser, microblading…
3. **¿Médico/clínico o spa?** (afecta tono + compliance HIPAA).
4. **Buyer persona principal**: edad, género, ingreso, qué quiere resolver.
5. **Colores de marca** (logo, paleta) — si no tienen, propone: blanco + nude + dorado rosa + carbón.
6. **¿Bilingüe?** Inglés siempre. Español si hay mercado hispano.
7. **Sistema de citas online** (Mindbody, Vagaro, Calendly embed, custom Cal.com self-hosted)?
8. **¿Quieren e-commerce de productos** (skincare retail) o solo info + booking?
9. **CRM/Email marketing**: Mailchimp, ConvertKit, Klaviyo, propio?
10. **Reviews integration**: Google Reviews API, Yelp embed, manuales hardcoded?
11. **Antes/Después photos**: ¿quieren galería before/after? (Cuidado con HIPAA si son pacientes reales).
12. **Blog/educación**: ¿quieren content marketing? Si sí → Markdown + folder, o headless CMS.
13. **Dominio**: ¿ya tienen?
14. **Hosting**: Vercel/Netlify gratis suele bastar. Si necesitan backend persistente → Railway/Render.
15. **Compliance**: HIPAA si son procedimientos médicos. Privacy Policy + Terms + cookie banner.

---

## 8. Páginas típicas para un centro estético

1. **Home**: hero con CTA "Book Consultation", featured services, testimonios, antes/después, instagram feed, CTA final.
2. **Services**: grid de todos los servicios. Click → detail page por servicio.
3. **Service detail**: descripción larga, beneficios, qué esperar, FAQ, before/after, precio "starting at", CTA booking.
4. **About / Team**: historia del centro, fotos de los doctores/estilistas, credenciales, MD/RN/Esthetician licensings.
5. **Gallery (Before/After)**: filtrable por tipo de tratamiento.
6. **Pricing** (opcional): tabla o "Request pricing".
7. **Book Now**: formulario o embed del booking system + selector de servicio + fecha + datos.
8. **Membership/Specials**: planes mensuales, paquetes, promociones.
9. **Blog**: posts educativos (SEO).
10. **Contact**: form + mapa + horarios + teléfono + email.
11. **FAQ**.
12. **Legal**: Privacy, Terms, HIPAA Notice, Accessibility, Sitemap.

---

## 9. Componentes específicos para el rubro

- **Before/After slider** (drag the line component): librería `before-after-slider` o custom con `clip-path`.
- **Service cards con iconos médicos/spa** (Material Icons: `spa`, `face`, `healing`, `medical_services`).
- **Trust badges**: "Board Certified", "5★ Google Rating", "FDA Approved Devices", "HIPAA Compliant".
- **Sticky "Book Now" CTA** flotante (similar al WhatsApp del FKAG).
- **Testimonial carousel** con foto + nombre + servicio recibido.
- **FAQ accordion** (`<details><summary>`).
- **Pricing comparison table** para membresías.
- **Newsletter signup** con incentivo ("$50 off your first treatment").
- **Pre-consultation questionnaire** (form más detallado).

---

## 10. Stack recomendado para VS Code

### Opción A — Astro (mi recomendación)
**Por qué**: SSG ultra rápido, soporta islands de React/Vue si necesitas interactividad, build a HTML estático súper SEO-friendly, deploy gratis a Vercel/Netlify/Cloudflare Pages.

```bash
npm create astro@latest centro-estetico
# Selecciona: Empty, TypeScript Strict, Install deps, Init git
cd centro-estetico
npx astro add tailwind
npm run dev
```

Estructura:
```
src/
  pages/         # index.astro, services.astro, etc. → routing automático
  components/   # Hero.astro, ServiceCard.astro, BookingForm.astro
  layouts/      # MainLayout.astro (header + footer wrapper)
  content/      # blog/ con MD/MDX, services/ JSON
  styles/       # global.css
public/         # imágenes, favicon, og-image
astro.config.mjs
tailwind.config.cjs
```

### Opción B — Next.js 14 (si quieres app router + server components)
Más pesado pero da más flexibilidad si después quieren un dashboard de admin.
```bash
npx create-next-app@latest centro-estetico --typescript --tailwind --app --src-dir
```

### Opción C — Vite + plain HTML/CSS/JS (mínimo)
Si quieres súper control y nada de framework, igual que en FKAG pero local:
```bash
npm create vite@latest centro-estetico -- --template vanilla-ts
```

### Para todos
- **Tailwind CSS** o CSS variables custom.
- **Iconos**: Lucide (open source, similar a Material Icons).
- **Fonts**: `@fontsource/inter` y `@fontsource/poppins` (locales, sin Google Fonts CDN).
- **Imágenes**: Astro `<Image>` o Next `<Image>` para optimización automática. Si externas → Cloudinary.
- **Forms**: Web Forms API + fetch a una function/route handler que reenvíe a n8n/email service.
- **Analytics**: Plausible (privacy-friendly), o GA4.
- **Deploy**: Vercel (1 click desde GitHub).

---

## 11. Setup paso a paso (Astro recomendado)

```bash
# 1. Crear proyecto
npm create astro@latest centro-estetico
cd centro-estetico

# 2. Tailwind + Astro integrations
npx astro add tailwind react
npm install @fontsource/inter @fontsource/poppins lucide-react

# 3. Estructura inicial
mkdir -p src/{components,layouts,content/services,content/blog,lib}
touch src/layouts/MainLayout.astro
touch src/components/{Header,Footer,Hero,ServiceCard,BookingForm,Testimonial,FAQ}.astro

# 4. Variables de entorno (.env)
cat > .env <<EOF
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_KEY=
PRIVATE_WEBHOOK_URL=
PUBLIC_CLOUDINARY_CLOUD=
EOF

# 5. Run dev
npm run dev

# 6. Cuando esté listo
npm run build
# Sube el dist/ a Vercel/Netlify, o conecta tu repo GitHub
```

---

## 12. Brief template para iniciar con Claude en el nuevo chat

> "Estoy construyendo el sitio web para **[NOMBRE DEL CENTRO]**, un centro estético en **[CIUDAD, ESTADO]**, USA.
>
> **Stack**: Astro + Tailwind + TypeScript, deploy en Vercel. Forms van a un webhook de n8n existente.
>
> **Idioma**: bilingüe ES/EN con localStorage + CustomEvent.
>
> **Diseño**: estilo premium spa, paleta nude + dorado rosa + carbón, tipografía Poppins (headings) + Inter (body), mucho whitespace, fotos grandes de calidad médica/wellness.
>
> **Páginas**: Home, Services (con detail por servicio), Team, Gallery (before/after), Membership, Book Now, Blog, Contact, FAQ, legal.
>
> **Componentes clave**: Hero con video bg o slider, ServiceCard, BeforeAfterSlider, TestimonialCarousel, FAQAccordion, StickyBookCTA, NewsletterSignup, MapEmbed, Header sticky con switch idioma, Footer.
>
> **Backend**: Supabase Postgres para tabla `services`, `team`, `gallery`, `testimonials`, `bookings`. RLS estricto.
>
> Te paso un giga-doc con todos los patrones aprendidos en un proyecto anterior — léelo antes de proponer arquitectura. Empezamos por el setup de Astro + Tailwind, el MainLayout, y el Header. Luego vamos componente por componente."

---

## 13. Checklist credenciales/assets para el nuevo proyecto

### Cuentas a crear
- [ ] GitHub repo (privado)
- [ ] Vercel account (linkear con GitHub)
- [ ] Supabase project (free tier ok para empezar)
- [ ] Cloudinary (free tier)
- [ ] n8n self-hosted (o n8n cloud)
- [ ] Email service: Resend.com (3000 emails/mes free) o SendGrid
- [ ] Booking platform (decidir): Cal.com self-hosted (gratis) / Mindbody / Vagaro
- [ ] Google Analytics 4
- [ ] Google Search Console
- [ ] Plausible (alternativa privacy-friendly)

### Variables de entorno típicas
```env
PUBLIC_SITE_URL=https://centro-estetico.com
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE=                # privada, solo server-side
PRIVATE_WEBHOOK_URL=https://n8n.../webhook/booking
PUBLIC_CLOUDINARY_CLOUD=
PUBLIC_GA_ID=G-XXXXXXX
PUBLIC_PLAUSIBLE_DOMAIN=
RESEND_API_KEY=
EVOLUTION_API_URL=
EVOLUTION_API_KEY=
EVOLUTION_INSTANCE=
INTERNAL_NOTIFICATION_EMAIL=staff@centro-estetico.com
INTERNAL_NOTIFICATION_PHONE=15551234567
```

### Assets
- [ ] Logo (SVG + PNG retina)
- [ ] Favicon set (favicon.ico + 16/32/192/512 PNG + apple-touch-icon-180)
- [ ] Open Graph image (1200×630)
- [ ] Fotos del local (high res, retoque profesional)
- [ ] Fotos del equipo
- [ ] Fotos de servicios (cada servicio)
- [ ] Before/After (con consentimiento firmado)
- [ ] Testimonios reales (texto + foto + nombre)
- [ ] Copy de cada servicio (descripción larga, beneficios, contraindicaciones, qué esperar)
- [ ] Pricing definitivo o "starting at"
- [ ] Horarios
- [ ] Dirección + Google Maps coords
- [ ] Teléfono + WhatsApp
- [ ] Redes reales (Instagram, TikTok)
- [ ] Términos legales redactados por abogado (HIPAA, Privacy, Terms)

---

## 14. Cosas que NO repetir del FKAG

1. **No pegar todo en widgets HTML de Elementor**. En Astro tienes componentes reales, layouts, slots → úsalos.
2. **No hardcodear el listado de servicios en el HTML**. Mete en `src/content/services/*.md` con frontmatter, o Supabase. El sitio renderiza desde ahí.
3. **No usar `localStorage` para todo**. Para preferencias de UI (idioma, tema) sí. Para autenticación/datos sensibles, no.
4. **No mezclar fetch directo a Supabase desde el cliente con escrituras**. Las INSERT/UPDATE pasan por API routes/server endpoints con la service-role key.
5. **No copiar el PDF en JS puro**. En Node tienes `pdfkit` o `@pdfme/generator` que son 10× más fáciles.
6. **No omitir el cookie consent banner**. USA tiene CCPA/CPRA en California — pon un banner.
7. **No olvides accessibility**: alt text en todas las imágenes, aria-labels en botones de íconos, focus ring visible (sin override `outline:none` sin reemplazo), color contrast WCAG AA.
8. **No deployees sin Lighthouse score** ≥ 90 en performance, accessibility, SEO. Astro te lo facilita.

---

## 15. Workflow recomendado con Claude en VS Code

1. **Lee este doc completo** antes de proponer arquitectura.
2. **Confirma el brief** con el usuario (preguntas §7).
3. **Genera estructura inicial** del proyecto (Astro setup) y haz commit.
4. **Trabaja componente por componente** — no intentes generar todo de una.
5. **Después de cada componente**, pídele al usuario que corra `npm run dev` y vea el resultado en `localhost:4321`.
6. **Itera con screenshots**: el usuario manda screenshot → tú ajustas → repetir.
7. **Cuando algo esté listo**, commit con mensaje descriptivo.
8. **Tests visuales antes que tests unitarios** en este tipo de proyecto.
9. **Mobile-first siempre**. Diseña para 375px primero, después escala.
10. **Performance budget**: imágenes <100KB cada una (Cloudinary o `<Image>`), JS <50KB total, fonts subset.

---

## 16. Anti-patrones que vi en FKAG (no repetir)

- ❌ JS inline en el HTML para todo. ✅ En Astro: componentes `.astro` con `<script>` específico, o componentes React/Vue islas.
- ❌ Estilos `!important` en cascada infinita. ✅ Tailwind o CSS modules con specificity controlada.
- ❌ Strings duplicados de i18n en cada widget. ✅ Un solo archivo `src/i18n/es.json` y `en.json`, importados desde donde se necesiten.
- ❌ URLs hardcoded de Cloudinary repetidas. ✅ Helper `getImage(publicId, transformations)`.
- ❌ Diccionario `TR` redefinido en cada widget. ✅ Función global `t(key)` con dictionaries cargados una vez.
- ❌ `localStorage.getItem` con try/catch en cada lugar. ✅ Helper `storage.get(k, default)`.
- ❌ Setear `localStorage.setItem('fkag_lang', 'en')` en N lugares distintos. ✅ Un solo `setLang(l)` que dispara el evento y guarda.

---

## 17. Estructura sugerida final del proyecto Astro

```
centro-estetico/
├── .env
├── .gitignore
├── astro.config.mjs
├── tailwind.config.cjs
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── og-image.jpg
│   └── images/             # estáticas (logo, hero bg)
├── src/
│   ├── pages/
│   │   ├── index.astro     # home
│   │   ├── services/
│   │   │   ├── index.astro # listing
│   │   │   └── [slug].astro # detail dinámico desde content
│   │   ├── about.astro
│   │   ├── gallery.astro
│   │   ├── membership.astro
│   │   ├── book.astro
│   │   ├── contact.astro
│   │   ├── faq.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   ├── accessibility.astro
│   │   ├── sitemap.astro
│   │   └── api/
│   │       ├── booking.ts  # POST → reenvía a n8n
│   │       └── contact.ts
│   ├── layouts/
│   │   ├── MainLayout.astro
│   │   └── BlogPostLayout.astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── LangSwitch.astro
│   │   ├── Hero.astro
│   │   ├── ServiceCard.astro
│   │   ├── BeforeAfterSlider.astro
│   │   ├── TestimonialCarousel.astro
│   │   ├── FAQAccordion.astro
│   │   ├── BookingForm.astro
│   │   ├── ContactForm.astro
│   │   ├── MapEmbed.astro
│   │   ├── StickyBookCTA.astro
│   │   ├── NewsletterSignup.astro
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── Card.astro
│   │       └── Eyebrow.astro
│   ├── content/
│   │   ├── config.ts         # collections schema
│   │   ├── services/
│   │   │   ├── botox.md
│   │   │   ├── fillers.md
│   │   │   └── ...
│   │   └── blog/
│   ├── i18n/
│   │   ├── es.json
│   │   ├── en.json
│   │   └── index.ts        # helper t(key, lang)
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── webhook.ts
│   │   └── storage.ts
│   └── styles/
│       └── global.css
└── README.md
```

---

## 18. Final words

- **Velocidad de iteración > arquitectura perfecta** al inicio. Es mejor tener el home funcionando en 1 día con código simple que un setup perfecto en 1 semana.
- **El cliente quiere ver resultados**. Mostrale el home antes que el código.
- **No reinventes**: para booking embed Calendly/Cal.com y listo. Para newsletter usa Resend/Mailchimp embed. Pelea solo lo único.
- **Performance importa para SEO** en Google. Lighthouse 90+ es realista en Astro.
- **Mobile representa 70%+** del tráfico en este nicho. Diseña móvil primero.
- **Si te trabas, recurre a este doc**. Casi todos los patrones del FKAG aplican.

---

**🚀 Suerte. Que el centro estético quede 10× mejor que el FKAG.**
