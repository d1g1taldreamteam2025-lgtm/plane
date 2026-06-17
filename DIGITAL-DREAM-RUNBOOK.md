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

---

## 📂 Workflow n8n "REVERGEN Plane → Drive" (clon de CRYO v14)

Clon del sistema **CRYO Plane → Drive (v14 final)** para el proyecto nuevo **REVERGEN**.
Sube los adjuntos de tareas completadas en Plane a Google Drive en
`REVERGEN / CATEGORÍA / MES / QUINCENA`, pega el link en la tarea y sincroniza
renombrados/borrados contra dos tablas Postgres propias. La lógica de mes/quincena
y las credenciales (Drive, Plane DB, Postgres) son **idénticas** a CRYO.

### IDs y recursos (REVERGEN)
- **Proyecto Plane:** `REVERGEN` (identifier `REV`) → **PROJECT_ID `bdaf595a-9f5d-4ef0-b53e-ff973e5b274e`**.
  Workspace `digital-dream` en https://plane.ucallnow.fun.
- **Carpetas Google Drive** (cuenta **cuenta1fulanomartin@gmail.com**, la misma del credential n8n):
  - Raíz `REVERGEN` → `1OczOfhlb4rNdspIyWBOyGUJm1GoPEzRI`
  - Categoría `REVERGEN 2026` → `1INHs2pfqiMpnGkp-qrw9GqGBSaFqseKK` (los meses/quincenas se crean dentro solos)
- **Label de ruteo** en el proyecto: `REVERGEN 2026` → `00b36ee4-2152-47d6-bb9d-b20f620b593d`
  (ruteo label→carpeta; el `default` del routing también apunta a `REVERGEN 2026`).
- **Tablas Postgres** (base de n8n "B 2026", host `supabase-db`, db `postgres`, credencial `uvp4tn6iPMBcAuTz`):
  `revergen_drive_sync` y `revergen_drive_files` — **mismo esquema exacto** que `plane_drive_sync` /
  `plane_drive_files` (no comparten datos con CRYO).
- **Workflow en n8n:** `REVERGEN Plane → Drive` (ID `7a3m90C0O4vSBgWu`), **activo**, mismos
  schedules que CRYO. Credenciales reutilizadas: Drive `cuenta1fulanomartin@gmail.com` (`FbTkr8vfX301LSMU`),
  `Plane DB` (`3iQF3ioYV3RysjUI`), `B 2026` (`uvp4tn6iPMBcAuTz`).

### Diferencias vs CRYO (lo único que cambió)
- Nombre del workflow y **PROJECT_ID** en los 4 nodos HTTP de Plane.
- `Plan de meses` (PARENTS) y `Filtrar tareas` (ROUTING) → carpeta/label de REVERGEN.
- Nodos Postgres: `plane_drive_sync`→`revergen_drive_sync`, `plane_drive_files`→`revergen_drive_files`.
- **Nombre de archivo SIN prefijo de persona:** `Preparar archivos` deja
  `${clean_name}_${fecha}.${ext}` y `uploader: ''`; `Comparar nombres` usa `${newClean}_${date}.${ext}`;
  el título del link en Plane ya no lleva `uploader:`.

### Copia del JSON
- **Sanitizada (en este repo, sin API key):** `ops/n8n/REVERGEN-Plane-Drive.json`.
- **Real e importable (solo en el server, con API key):** `/root/plane-rescue/REVERGEN-Plane-Drive.n8n.json`.
  Reimportar: `docker exec <n8n> n8n import:workflow --input=/tmp/REVERGEN-Plane-Drive.n8n.json`
  (cópialo antes al contenedor) y luego activar con `n8n update:workflow --id=7a3m90C0O4vSBgWu --active=true`
  **+ reiniciar n8n** (`docker service update --force ucallnow_interno_n8n`) para que registre los triggers.

### Prueba end-to-end — 2026-06-16 (OK)
Tarea de prueba `REV-1 "Reel Promo Junio REV"`, completada con un adjunto. Resultado:
- Archivo en Drive `REVERGEN / REVERGEN 2026 / 06 JUNIO / 16-30 / Reel_Promo_Junio_REV_2026-06-16.mp4`
  (**sin prefijo de persona**).
- Link en la tarea: `📁 [REVERGEN 2026] Reel_Promo_Junio_REV (06 JUNIO/16-30)`.
- Filas creadas en `revergen_drive_sync` y `revergen_drive_files`. Ejecución n8n `success`.

---

## 🏢 Escalado multi-marca (agencia) — 2026-06-17

Se replicó el sistema Plane→Drive para 4 marcas nuevas y se montó el control de accesos por rol.
Todo reutiliza las mismas credenciales n8n (Drive `FbTkr8vfX301LSMU` = cuenta1fulanomartin@gmail.com,
Plane DB `3iQF3ioYV3RysjUI`, Postgres "B 2026" `uvp4tn6iPMBcAuTz`) y la API key de Plane
(cuenta **d1g1tal.dream.team.2025@gmail.com** = dueña del API key y de los backups).

### Proyectos (workspace digital-dream)
| Proyecto | Identifier | PROJECT_ID | Tipo |
|---|---|---|---|
| CRYO ESTHETICS SILUET | CRYO | `d1b1510e-c708-47f6-be0e-ac9ae73b6c0d` | contenido (cliente) |
| REVERGEN | REV | `bdaf595a-9f5d-4ef0-b53e-ff973e5b274e` | contenido (cliente) |
| RBS MEDISTORE | RBS | `fd26e357-51d8-4e41-9c7f-c0206db0180e` | contenido (cliente) |
| PEPTIUM MX | PEP | `d351a415-d883-4af0-99f1-9c51a1728411` | contenido (cliente) |
| CADCAM | CAD | `e5f5196b-2d7b-427c-9ef3-a4d0127de259` | contenido (cliente, clínica dental) |
| UCALLNOW | UCN | `d82e4778-083d-4606-82c7-050b53e0a61f` | interno/técnico (NO cliente) |

### Estados (los 6 proyectos, en español, orden + grupo)
`IDEAS`(backlog) → `POR HACER`(unstarted) → `EN PROCESO`(started) → `REVISIÓN`(started) →
`AJUSTES`(started) → **`HECHO`(completed — dispara el envío a Drive)** → `CANCELADO`(cancelled).
Único estado `completed` = HECHO; único default = IDEAS. (CRYO se consolidó quitando los estados
ingleses/duplicados y un "Aprobado" sobrante, reubicando tareas antes de borrar.)

### Carpetas Google Drive (cuenta cuenta1fulanomartin@gmail.com) + Labels de ruteo
| Marca | Carpeta raíz (ID) | Categoría → folder ID / label ID |
|---|---|---|
| CRYO | `1VYHo1qEUtGycACcBfQk2WfM3IemtToig` | TAREAS ISABELLA `1pl8-47IE…`, MATERIAL SPA `1q5-UBM4…`, IDEAS `1mc7JO9n…` (labels preexistentes) |
| REVERGEN | `1OczOfhlb4rNdspIyWBOyGUJm1GoPEzRI` | REVERGEN 2026 `1INHs2pf…` / label `00b36ee4-2152-47d6-bb9d-b20f620b593d` |
| RBS MEDISTORE | `1DXW0PxbNfpm63Z_a14TzvimjxFcUwu_K` | RBS MEDISTORE 2026 `16ZH6DzA…` / label `81ac5114-20a3-43d0-b4ba-c14f8983758c` |
| PEPTIUM MX | `1zxBj3WWa8MLAL0T23dTk0KKpB3MD8wtT` | PEPTIUM MX 2026 `1jK01hc6…` / label `69e434bf-bef3-499d-b832-ac756797495d` |
| CADCAM | `1AuRVv8rB5tP8JChW2Eck3B-l1mI6HW2r` | CADCAM 2026 `1SqHX7ad…` / label `17beee26-a81e-4594-a5c5-d161f9ef2d4b` |
| UCALLNOW | `1b0b3uHicWyd9hWhigEc177QFk0b4a8iS` | USELLNOW `1Oe2Q29a…`/`56f2d35e…`, SOFIA AGENT `1ogwTTmy…`/`beb09255…`, PAGINAS WEB `1KPLvjBz…`/`cf24d410…`, UCALLNOW TEAM `1Zs0nW92…`/`0d4d471c…` (default), BDC CALLCENTER `1klQEDzT…`/`81a077e5…` |

> CRYO: se creó una raíz limpia "CRYO" y se **movieron** dentro las 3 categorías (mover NO cambia el ID
> en Drive, por eso el workflow CRYO siguió funcionando sin tocarlo).

### Tablas Postgres ("B 2026" / host `supabase-db` / db `postgres`)
Mismo esquema exacto que `plane_drive_sync` / `plane_drive_files` por marca:
`cryo_*` (plane_drive_*), `revergen_drive_*`, `rbs_drive_*`, `peptium_drive_*`, `ucallnow_drive_*`, `cadcam_drive_*`
(cada uno con `_drive_sync` y `_drive_files`).

### Workflows n8n (todos ACTIVOS, clonados de "REVERGEN Plane → Drive" sin prefijo de persona)
| Workflow | ID n8n |
|---|---|
| CRYO Plane → Drive (v14 final) | `hTK0ouxHQaDB9Mzl` |
| REVERGEN Plane → Drive | `7a3m90C0O4vSBgWu` |
| RBS MEDISTORE Plane → Drive | `Y2yEG34aG0DFUhSc` |
| PEPTIUM MX Plane → Drive | `TRehwa0XP493fg5K` |
| CADCAM Plane → Drive | `xQh35KfpiXPsZYXD` |
| UCALLNOW Plane → Drive (multi-categoría) | `UsB8s30o3DnyimAm` |

Cambios por clon (lo único): nombre, PROJECT_ID (4 nodos), `Plan de meses` (PARENTS) y
`Filtrar tareas` (ROUTING: label→carpeta + default), y nombres de tabla. UCALLNOW rutea cada label
a su carpeta y `UCALLNOW TEAM` es el default. Para activar tras importar: `n8n update:workflow
--id=<ID> --active=true` **+ reiniciar n8n** (`docker service update --force ucallnow_interno_n8n`).
JSON sanitizado (sin API key) en `ops/n8n/`. **Prueba end-to-end de las 4 marcas: PASS** (archivo en
`<RAÍZ>/<CATEGORÍA>/MES/QUINCENA`, link en la tarea, filas en Postgres); datos de prueba borrados.

### Matriz de accesos (proyectos PRIVADOS / solo-miembros)
Roles Plane: Admin=20, Member=15, Guest=5. **Un Workspace Admin ve TODOS los proyectos** (por eso los
demás son Member del workspace).

| Persona | Email | Workspace | Proyectos |
|---|---|---|---|
| Sebastian (dueño/automatización) | d1g1tal.dream.team.2025@gmail.com | Admin | Admin en TODOS |
| Isabella (diseñadora 1) | isabella.mposada@gmail.com | Member | Member en CRYO, REVERGEN, RBS, PEPTIUM, CADCAM (no UCALLNOW) |
| Gynna Navarro (diseñadora 2) | gynnanavarro@gmail.com | Member | Member en CRYO, REVERGEN, RBS, PEPTIUM, CADCAM (no UCALLNOW) |
| Juan Ochoa | juan.ochoa@ucallnow.net | Member | Member SOLO en UCALLNOW |

Login: https://plane.ucallnow.fun (email + contraseña; Google OAuth desactivado). Gynna y Juan se
crearon con contraseña temporal (entregada aparte, **no** en el repo; cambiar al primer ingreso).
Notas: cuenta duplicada `isabela.mposada@gmail.com` (1 "L", sin membresías) pendiente de revisar/borrar;
el proyecto "Digital Dream" (no es marca) quedó público (el API key no es admin ahí).

### Carpetas compartidas con clientes (Drive)
Compartidas como **"cualquiera con el enlace → Editor"** (confirmado por el dueño; ⚠️ cualquiera con el
link puede editar/borrar). UCALLNOW **no** se comparte.
- CRYO: https://drive.google.com/drive/folders/1VYHo1qEUtGycACcBfQk2WfM3IemtToig
- REVERGEN: https://drive.google.com/drive/folders/1OczOfhlb4rNdspIyWBOyGUJm1GoPEzRI
- RBS MEDISTORE: https://drive.google.com/drive/folders/1DXW0PxbNfpm63Z_a14TzvimjxFcUwu_K
- PEPTIUM MX: https://drive.google.com/drive/folders/1zxBj3WWa8MLAL0T23dTk0KKpB3MD8wtT
- CADCAM: https://drive.google.com/drive/folders/1AuRVv8rB5tP8JChW2Eck3B-l1mI6HW2r

### Ciclos (sprints) quincenales
En los 6 proyectos se crearon 2 ciclos del mes actual, alineados a la estructura de Drive:
`Junio 2026 · 1ª quincena (01–15)` y `Junio 2026 · 2ª quincena (16–30)`. Crear los próximos por API:
`POST /projects/<id>/cycles/` con `{name, start_date, end_date, project_id}` (el `project_id` va también en el body).

### Uso del equipo (funciones nativas de Plane)
- **Prioridad:** campo nativo por tarea (Urgent/High/Medium/Low/None) — usarlo para ordenar el trabajo.
- **Asignados (Assignees):** asignar cada tarea a la persona responsable; las diseñadoras filtran "Assigned to me".
- **Fechas:** Start date / Due date por tarea; el ciclo quincenal agrupa el sprint.
- **Flujo:** IDEAS → POR HACER → EN PROCESO → REVISIÓN → AJUSTES → **HECHO** (al pasar a HECHO con adjunto,
  la automatización sube el archivo a Drive y pega el link). CANCELADO para descartes.
