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

## 💾 Backups automáticos (local + Google Drive offsite)

Backup **diario automático** de la base de datos y los archivos subidos, con copia
**local** (red de seguridad) **y offsite en Google Drive** (fuera del servidor).

- **Script:** `/root/scripts/plane-backup.sh` (un solo script hace local + Drive)
  1. `pg_dump` comprimido de Postgres (contenedor `ucallnow_interno_plane-plane-db-1`, db `plane`) → `plane-db-<fecha>.sql.gz`.
  2. `tar.gz` del volumen `ucallnow_interno_plane_uploads` **montado solo-lectura** (`:ro`) → `plane-uploads-<fecha>.tar.gz`.
  3. Valida integridad (`gzip -t`), **rota local conservando los últimos 7 días**.
  4. **Offsite a Drive:** sube el dump de BD a `…/db/` (**rota a los últimos 14**) y hace
     `rclone sync` **incremental** del volumen de uploads a `…/uploads/`.
- **Destino local:** `/root/plane-rescue/auto/` (log en `backup.log`, salida de cron en `cron.log`).
- **Destino offsite:** remote rclone **`gdrive`** → carpeta **`DIGITAL DREAM/Plane-Backups/`**
  (`db/` = dumps rotados 14; `uploads/` = espejo incremental del bucket).
- **Cron:** diario a las **3:30am** (hora del server):
  ```cron
  30 3 * * * /root/scripts/plane-backup.sh >> /root/plane-rescue/auto/cron.log 2>&1
  ```
- **Ejecutar a mano:** `/root/scripts/plane-backup.sh`

### Sobre el `rclone sync` de uploads
- Es un **espejo incremental**: solo transfiere lo que cambió; **refleja borrados**
  (si borras un asset en Plane, desaparece de Drive en el siguiente sync).
  El historial punto-en-el-tiempo lo dan los **dumps de BD (14 días)** y los **tar locales (7 días)**.
- Se **excluye `.minio.sys/**`** (metadata interna volátil de MinIO que cambia
  constantemente y rompía el sync). Los objetos del bucket `uploads/` son inmutables y sí sincronizan bien.

### Autorización de rclone / Google Drive (server headless)
El remote `gdrive` ya está autorizado en `/root/.config/rclone/rclone.conf` (`type = drive`).
Si hubiera que **re-autorizar** (token revocado), como el server no tiene navegador:
1. En el server: `rclone config reconnect gdrive:` → al pedir "Use web browser to automatically
   authenticate?" responde **No**. Te dará un comando `rclone authorize "drive"`.
2. En **tu PC** (con navegador y rclone instalado) ejecuta ese comando, inicia sesión en Google,
   y copia el bloque JSON (`token`) que imprime.
3. Pega ese token en el server cuando lo pida. Verifica con `rclone about gdrive:`.

### Restaurar
  ```bash
  # --- Base de datos (desde local o tras bajar de Drive) ---
  gunzip -c /root/plane-rescue/auto/plane-db-<fecha>.sql.gz \
    | docker exec -i -e PGPASSWORD=plane ucallnow_interno_plane-plane-db-1 psql -U plane -d plane
  # Bajar un dump desde Drive:
  rclone copy "gdrive:DIGITAL DREAM/Plane-Backups/db/plane-db-<fecha>.sql.gz" /root/plane-rescue/restore/

  # --- Uploads desde el tar local (CUIDADO: sobrescribe el volumen) ---
  docker run --rm -v ucallnow_interno_plane_uploads:/data \
    -v /root/plane-rescue/auto:/backup alpine \
    sh -c 'tar xzf /backup/plane-uploads-<fecha>.tar.gz -C /data'
  # --- Uploads desde Drive (espejo) hacia el volumen ---
  rclone copy "gdrive:DIGITAL DREAM/Plane-Backups/uploads" \
    /var/lib/docker/volumes/ucallnow_interno_plane_uploads/_data/uploads
  ```

> Tamaños de referencia: db ≈ 4.3 MB, uploads ≈ 507 MB (85 objetos).
> **Espacio en Drive:** la cuenta tiene ~15 GB (≈4.7 GB libres al configurar). Vigílalo:
> `rclone about gdrive:`. Si los uploads crecen mucho, considerar una cuenta/Shared Drive dedicado.

---

## 🔁 Auto-arranque tras reinicio del servidor

Todos los servicios long-running tienen restart policy **`unless-stopped`** → Plane
**arranca solo** cuando el servidor (o Docker) se reinicia, sin intervención manual.

- En el **compose** se usa `restart: unless-stopped` por servicio (se quitó el viejo
  `deploy.restart_policy: on-failure`, que `docker compose` mapeaba a `on-failure` y **no**
  garantiza el arranque tras un reboot del host).
- **`migrator` queda a propósito en `on-failure`**: es un contenedor de un solo uso (corre
  migraciones y termina); con `unless-stopped`/`always` entraría en bucle infinito.
- Aplicar/verificar en caliente (sin recrear) si hiciera falta:
  ```bash
  for c in $(docker ps -a --format '{{.Names}}' | grep -i plane | grep -v migrator); do
    docker update --restart unless-stopped "$c" >/dev/null
  done
  docker ps -a --format '{{.Names}}' | grep -i plane | while read c; do
    printf '%-45s %s\n' "$c" "$(docker inspect -f '{{.HostConfig.RestartPolicy.Name}}' "$c")"; done
  ```
  Esperado: todos `unless-stopped` (salvo `migrator`, que no suele estar corriendo).

---

## ✅ Estado blindado
- **Datos** → volúmenes persistentes + backups en `~/plane-rescue/`.
- **Branding/código** → en GitHub (`cryo-custom`).
- **Imagen** → en ghcr.io, reconstruida sola por CI (GitHub Actions).
- Un redeploy **ya no puede romperse** por una imagen borrada localmente.

---

## 🧪 Verificación post-apagón — 2026-06-15
Tras un corte de luz y reinicio del servidor se confirmó (sin tocar volúmenes de datos):
- **Auto-arranque OK:** los 12 servicios long-running volvieron solos (`restart: unless-stopped`
  presente en runtime **y** en `docker-compose.yml`, por lo que sobrevive redeploys de easypanel).
  `migrator` queda en `on-failure` a propósito. Plane responde **HTTP 200** en https://plane.ucallnow.fun/.
- **Backups a Drive OK:** prueba manual end-to-end exitosa (exit 0), offsite incluido.
  Drive `…/Plane-Backups/db/` contiene los dumps diarios (rotación 14) y `…/uploads/` el espejo
  incremental (85 objetos ≈ 506 MiB, igual al volumen local). Cron diario activo a las 3:30am.
