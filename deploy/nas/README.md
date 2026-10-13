# Current NAS instance source and deployment snapshot

This repository snapshot was copied from the running NAS instance on 2026-10-13.
The upstream base is `41a0077b7e76c1050b28f67537f00705a9095ed5`.
It includes the current BlackRoom identity/session adapter, Unicode nickname
validation, structured CSRF rejection and HTTP/HTTPS WebSocket origin handling.
Application source is at the repository root; these files describe its Docker
build and the current deployment. Existing NAS services were not changed by the
source export.

## Deployment files

- `compose.instance.yaml`: exact current Compose configuration with credential
  references, resource limits and pinned auxiliary images. Application image
  hashes are **local NAS image IDs**, not downloadable registry images. They
  must be replaced with locally rebuilt image tags when deploying elsewhere.
- `gateway.conf`: current Nginx routes and dynamic Docker DNS resolution.
- `tools.Dockerfile`: pinned Node 16 build tools using upstream compiler packages.
- `backend.Dockerfile`: upstream backend build with a project-scoped common image.
- `web-runtime.Dockerfile`: upstream-style web runtime with frozen dependencies.
- `secrets.env.example`: required variable names, containing no real credentials.

The current instance expects PostgreSQL and Redis on its private Docker network.
Its member-access gateway is an external BlackRoom dependency, and provides the
same-origin `/_blackroom/me` endpoint. That gateway, its credentials and unrelated
site configuration are not part of this application source export. The current
Compose snapshot has no published host ports; do not mistake it for the earlier
standalone LAN testing configuration.

The private and edge network names in the snapshot are existing deployment
resources. The edge network is declared but the current gateway service only
joins the private network. Do not create networks or change exposure without
checking the environment and obtaining the appropriate authorization.

## Rebuilding on the NAS

Run these build steps from a writable checkout of this repository on the NAS.
They build application images, not a public entrypoint. Keep all Yarn lockfiles.

```sh
docker build -t freeboardgames-20261013-common:41a0077 common
docker build -t freeboardgames-20261013-tools:41a0077 -f deploy/nas/tools.Dockerfile .
docker run --rm --user "$(id -u):$(id -g)" -e HOME=/tmp -e HUSKY=0 \
  -v "$PWD:/src" -w /src freeboardgames-20261013-tools:41a0077 \
  sh -c 'yarn install --frozen-lockfile --ignore-scripts && cd web && yarn install --frozen-lockfile && cd .. && yarn run codegen'
docker run --rm --network none --user "$(id -u):$(id -g)" \
  -e HOME=/tmp -e HUSKY=0 -e NEXT_TELEMETRY_DISABLED=1 \
  -e NODE_OPTIONS=--max-old-space-size=6144 -e GIT_REV="$(git rev-parse HEAD)" \
  -v "$PWD:/src" -w /src/web freeboardgames-20261013-tools:41a0077 \
  sh -c 'yarn run build:server && yarn run build'
git archive --format=tar.gz HEAD -o web/public/source.tar.gz
docker build -t freeboardgames-20261013-backend:41a0077 -f deploy/nas/backend.Dockerfile fbg-server
docker build -t freeboardgames-20261013-web:41a0077 -f deploy/nas/web-runtime.Dockerfile web
```

The generated `web/public/source.tar.gz` can be served as the corresponding
source download; it is a generated artifact and is intentionally not committed.
The `41a0077` suffix preserves the current deployment's local naming convention;
it identifies the upstream base, not the complete modified source commit.
Record the actual repository commit and resulting image IDs for each rebuild.

Before using the Compose snapshot, substitute the rebuilt application image
references, provide a local `secrets.env`, and retain the existing database
volume. Its `FORCE_DB_SYNC=false` setting is for an initialized schema. First-time
schema initialization is a separate operational step, not an automatic migration
on an existing database. Do not overwrite volumes or regenerate live credentials
while importing source.

Health probes, `unless-stopped` restart policies and capped JSON logs are present
in Compose. Back up PostgreSQL with `pg_dump -Fc` and protect credentials separately.
Actual secrets, database contents, backups, test credentials, generated game
indexes, translations, documentation bundles and `node_modules` are excluded.

This publication verifies source equivalence and export hygiene. It does not
rerun or claim new application functional tests for the later BlackRoom changes.
