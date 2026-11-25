# =========================================================
# Etapa 1: CLONAR y COMPILAR la app Angular
# =========================================================
# Node 22: versión compatible con Angular 19
FROM node:22-alpine AS build

# Datos del repositorio (se definen en docker-compose.yml)
ARG REPO_URL
ARG BRANCH=main
ARG APP_DIR=angular-app

# git es necesario para clonar el repositorio
RUN apk add --no-cache git

WORKDIR /src

# 1) Clonar el repo público de GitHub (solo el último commit)
RUN test -n "$REPO_URL" || (echo "ERROR: falta REPO_URL" && exit 1) \
 && git clone --depth 1 --branch "$BRANCH" "$REPO_URL" repo

WORKDIR /src/repo/${APP_DIR}

# 2) Instalar dependencias exactamente como dice package-lock.json
RUN npm ci --no-audit --no-fund

# 3) Compilar la app Angular en modo producción
RUN npx ng build --configuration production

# Angular 17+ deja la salida en dist/<proyecto>/browser; se copia a /out
RUN INDEX=$(find dist -name index.html | head -n 1) \
 && test -n "$INDEX" || (echo "ERROR: no se encontró index.html en dist/" && exit 1) \
 && mkdir -p /out && cp -r "$(dirname "$INDEX")"/. /out/

# =========================================================
# Etapa 2: SERVIR el resultado con nginx
# =========================================================
FROM nginx:1.27-alpine

# Configuración para una SPA: cualquier ruta (/jahir, /eduardo, ...) regresa index.html
RUN printf '%s\n' \
  'server {' \
  '  listen 80;' \
  '  server_name _;' \
  '  root /usr/share/nginx/html;' \
  '  index index.html;' \
  '  location / {' \
  '    try_files $uri $uri/ /index.html;' \
  '  }' \
  '}' > /etc/nginx/conf.d/default.conf

# Reemplazar la página por defecto de nginx con la app compilada
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /out/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
