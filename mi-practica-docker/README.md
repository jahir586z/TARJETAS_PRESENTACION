# Actividad 9: Docker Compose – Tarjetas de presentación (Angular + nginx)

Un `docker-compose.yml` y un `Dockerfile` levantan un contenedor que:

1. **Clona** el repositorio público de GitHub del equipo,
2. **compila** la app Angular y
3. **sirve** el resultado con **nginx** en <http://localhost:8080>.

- Repositorio clonado: <https://github.com/jahir586z/TARJETAS_PRESENTACION> (rama `main`, carpeta `angular-app/`)
- App: Angular 19, con un componente por integrante

## Integrantes del equipo

- Jahir Moroles
- Rodrigo Méndez
- Christian Saucedo
- Jaime Escobedo
- Eduardo Adame Venancio

## Estructura

```
/mi-practica-docker/
├── Dockerfile             # Multi-stage: node (clonar + compilar) -> nginx (servir)
├── docker-compose.yml     # Construye la imagen y publica el puerto 8080
├── .dockerignore          # Excluye archivos innecesarios del contexto de build
├── README.md              # Este archivo
└── tarjetas-angular.tar   # Imagen generada con docker save
```

## La app Angular (`angular-app/` en el repo del equipo)

Cada integrante subió su tarjeta como HTML/CSS en su carpeta. Esas tarjetas se fusionaron
en una app Angular, con un componente por tarjeta y una ruta para cada uno:

| Ruta | Componente | Origen |
|---|---|---|
| `/` | `InicioComponent` | `index.html` + `style.css` (raíz) |
| `/jahir` | `JahirComponent` | `jahir/` |
| `/rodrigo` | `RodrigoComponent` | `rodrigo/` |
| `/christian` | `ChristianComponent` | `christian/` |
| `/jaime` | `JaimeComponent` | `jaime/` |
| `/eduardo` | `EduardoComponent` | `eduardo/` |

## Cómo funciona el Dockerfile

| Etapa | Imagen base | Qué hace |
|---|---|---|
| `build` | `node:22-alpine` | Instala git, `git clone --depth 1 --branch main`, entra a `angular-app/`, `npm ci`, `ng build --configuration production` |
| final | `nginx:1.27-alpine` | Copia la app compilada a `/usr/share/nginx/html` y la sirve en el puerto 80; `try_files` hace que las rutas de Angular funcionen al recargar |

La imagen final solo contiene nginx y los archivos compilados (~21 MB), sin Node ni código fuente.
`REPO_URL`, `BRANCH` y `APP_DIR` se definen en `docker-compose.yml` y se pueden cambiar con variables de entorno.

## Pasos ejecutados

### 1. Validar la configuración

```powershell
cd mi-practica-docker
docker compose config
```

### 2. Construir la imagen (clonar + compilar)

```powershell
docker compose build --no-cache --progress=plain
```

En el log se ve cada paso: `git clone`, `npm ci` y `ng build` (`Application bundle generation complete`).
Resultado: imagen `mi-practica-docker/tarjetas-angular:1.0`.

### 3. Levantar el contenedor

```powershell
docker compose up -d
docker compose ps
docker images mi-practica-docker/tarjetas-angular
```

```
NAME               IMAGE                                     STATUS   PORTS
tarjetas-angular   mi-practica-docker/tarjetas-angular:1.0   Up       0.0.0.0:8080->80/tcp
```

### 4. Verificar en el navegador

Abrir <http://localhost:8080>. Aparece la página **Nuestro Equipo** con las 5 tarjetas.
Cada botón abre la tarjeta del integrante (`/jahir`, `/rodrigo`, `/christian`, `/jaime`, `/eduardo`); todas responden `200`.

### 5. Guardar la imagen con `docker save`

```powershell
docker save mi-practica-docker/tarjetas-angular:1.0 -o tarjetas-angular.tar
```

Archivo: `tarjetas-angular.tar` (~20 MB, por debajo del límite de 100 MB de GitHub).

### 6. Probar el `.tar` (cargar la imagen en cualquier máquina)

```powershell
docker load -i tarjetas-angular.tar
docker run -d -p 8080:80 mi-practica-docker/tarjetas-angular:1.0
```

### 7. Subir a GitHub

```powershell
git clone https://github.com/jahir586z/TARJETAS_PRESENTACION.git
# copiar la carpeta mi-practica-docker/ dentro del repo
cd TARJETAS_PRESENTACION
git add mi-practica-docker
git commit -m "Práctica Docker: Angular + nginx con docker compose"
git push
```

### 8. Detener

```powershell
docker compose down
```
