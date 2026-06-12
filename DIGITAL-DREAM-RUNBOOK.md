# 🚀 Digital Dream (Plane) — Guía de operación y recuperación

Guía rápida para operar y recuperar la instancia de Plane personalizada ("Digital Dream").

## Arquitectura

- **Hosting:** servidor Contabo, gestionado con **easypanel** (proyecto `ucallnow_interno`, servicio `plane`, tipo *Compose*).
- **Servicios** (contenedores `ucallnow_interno_plane-*`): `web`, `api`, `worker`, `beat-worker`, `migrator`, `live`, `space`, `admin`, `proxy`, `plane-db` (Postgres), `plane-redis`, `plane-mq` (RabbitMQ), `plane-minio`.
- **Datos persistentes** (volúmenes Docker — NO se borran en un redeploy):
  - `ucallnow_interno_plane_pgdata` → base de datos (tareas, proyectos).
  - `ucallnow_interno_plane_uploads` → archivos subidos (audios, adjuntos).
- **Frontend personalizado (branding Digital Dream):**
  - Código fuente: repo `d1g1taldreamteam2025-lgtm/plane`, rama `cryo-custom`.
  - Imagen: `ghcr.io/d1g1taldreamteam2025-lgtm/plane-web-cryo:latest`, **construida automáticamente** por GitHub Actions (`.github/workflows/build-web-digital-dream.yml`) en cada push.
  - El servicio `web` usa esa imagen con `pull_policy: always` (siempre baja la última).

## Archivos clave (en el servidor)

- Compose: `/etc/easypanel/projects/ucallnow_interno/plane/code/docker-compose.yml`
- Código del branding: `/root/custom-plane/plane/` (rama `cryo-custom`)
- Backups: `/root/plane-rescue/`

---

## 🔧 Tareas comunes

### Reiniciar / levantar Plane (si se cae o da 502)
```bash
cd /etc/easypanel/projects/ucallnow_interno/plane/code
docker compose -f docker-compose.yml -f docker-compose.override.yml -p ucallnow_interno_plane up -d
docker ps --format '{{.Names}}\t{{.Status}}' | grep -i plane
curl -s -o /dev/null -w "Plane: %{http_code}\n" https://plane.ucallnow.fun/
```
Esperado: contenedores en `Up`, curl `200`.

### Cambiar el branding (logo, textos, colores, etc.)
1. Edita los archivos en el repo (ej. `apps/web/core/components/auth-screens/`).
2. `git add -A && git commit -m "..." && git push`
3. Espera el ✓ verde en GitHub → pestaña **Actions** (construye la imagen sola, ~5 min).
4. En el server, redeploy (comando de arriba). Como `pull_policy: always`, baja la imagen nueva.

### Backup manual de la base de datos y archivos
```bash
mkdir -p ~/plane-rescue && DATE=$(date +%F)
docker run --rm -v ucallnow_interno_plane_pgdata:/data:ro -v ~/plane-rescue:/backup alpine \
  tar czf /backup/plane_pgdata_$DATE.tar.gz -C /data .
docker run --rm -v ucallnow_interno_plane_uploads:/data:ro -v ~/plane-rescue:/backup alpine \
  tar czf /backup/plane_uploads_$DATE.tar.gz -C /data .
```

---

## 🚨 Recuperación ante problemas

### "502 Bad Gateway" / "host not found" (errores en n8n)
Significa que Plane o su base de datos está caído. Solución: el comando de **"Reiniciar / levantar Plane"** de arriba. Revisa que `plane-db` esté `Up`.

### El frontend perdió el branding (se ve "Plane" otra vez)
El compose volvió a la imagen vieja. Revisa la línea del `web`:
```bash
grep -nE 'image:|pull_policy' /etc/easypanel/projects/ucallnow_interno/plane/code/docker-compose.yml | grep -i ghcr
```
Debe decir `image: ghcr.io/d1g1taldreamteam2025-lgtm/plane-web-cryo:latest`. Si no, corrígela y redeploy.

### La imagen del frontend "desapareció"
Ya **no es problema**: está en ghcr.io y `pull_policy: always` la vuelve a bajar en cada redeploy.
Reconstrucción manual (plan B): `cd /root/custom-plane/plane && docker build -f apps/web/Dockerfile.web -t plane-cryo:custom .`

---

## 🔒 Durabilidad frente a easypanel (¿el botón "Deploy" revierte mis cambios?)

Dos personalizaciones viven **solo** en `docker-compose.yml` (no en el store de easypanel):
1. `web` usa `image: ghcr.io/d1g1taldreamteam2025-lgtm/plane-web-cryo:latest` + `pull_policy: always` (branding).
2. `proxy` tiene el bind-mount `…/code/Caddyfile:/etc/caddy/Caddyfile:ro` (arregla los uploads 405).

**Verificado en el código de easypanel (`/app/backend.js`, jun-2026):**

- ✅ **El botón "Deploy" NO regenera `docker-compose.yml`.** Para un servicio Compose *inline* corre
  `docker compose -f docker-compose.yml -f docker-compose.override.yml -p … up --build -d` sobre el archivo
  **en disco**. Solo regenera `docker-compose.override.yml` (alias de red) y, opcionalmente, `.env`.
  → Nuestros cambios **persisten** ante cualquier Deploy normal.
- ⚠️ **Único vector de reversión:** abrir el **editor de Compose en la UI de easypanel y pulsar "Guardar"**
  (mutación `updateSourceInline`). Ese flujo hace `rm -rf` del directorio `code/` y reescribe `docker-compose.yml`
  desde el store interno (versión vieja) — además **borra el `Caddyfile`**. No hagas eso sin actualizar antes
  el store. (No editar `data/data.mdb` a mano: es LMDB binario y se corrompería.)

**Red de seguridad (recuperación en 1 comando):**
- Copias "golden" fuera del dir gestionado: `/root/plane-rescue/golden/{docker-compose.yml,Caddyfile}` (+ `CHECKSUMS.txt`).
- Script: **`/root/scripts/reapply-plane-customizations.sh`** → restaura ambos archivos y redespliega.
  Úsalo si alguien revierte desde la UI:
  ```bash
  /root/scripts/reapply-plane-customizations.sh
  ```
- Para hacerlo durable **también** ante un "Guardar" en la UI: pega el contenido de
  `/root/plane-rescue/golden/docker-compose.yml` en el editor de Compose de easypanel y guarda
  (eso actualiza el store), y vuelve a colocar el `Caddyfile` con el script de arriba.

---

## ✅ Estado blindado
- **Datos** → volúmenes persistentes + backups en `~/plane-rescue/`.
- **Branding/código** → en GitHub (`cryo-custom`).
- **Imagen** → en ghcr.io, reconstruida sola por CI (GitHub Actions).
- Un redeploy **ya no puede romperse** por una imagen borrada localmente.
