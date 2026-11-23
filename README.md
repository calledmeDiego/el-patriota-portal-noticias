# Instalación y ejecución

## 1. Requisitos previos

Antes de comenzar, instala las siguientes herramientas:

- [Node.js](https://nodejs.org/) (versión LTS).
- [Git](https://git-scm.com/).

Verifica que estén instaladas:

```bash
node -v
npm -v
git --version
```

## 2. Descargar el proyecto

Clona el repositorio desde GitHub:

```bash
git clone https://github.com/calledmeDiego/el-patriota-portal-noticias.git
```

Ingresa a la carpeta del proyecto:

```bash
cd el-patriota-portal-noticias
```

## 3. Instalar dependencias

Ejecuta el siguiente comando:

```bash
npm install
```

## 4. Ejecutar en desarrollo

Inicia el servidor local:

```bash
npm run dev
```

Abre en tu navegador la dirección que proporciona Vite. Por defecto:

```text
http://localhost:5173/
```

## 5. Compilar para producción

Para generar la versión optimizada:

```bash
npm run build
```

Los archivos compilados se almacenarán en la carpeta `dist/`.

## 6. Previsualizar la versión de producción

Ejecuta:

```bash
npm run preview
```

Abre la dirección local que indique la terminal para visualizar la versión compilada.

## 7. Actualizar el proyecto

Si ya tienes el repositorio clonado y deseas descargar los últimos cambios:

```bash
git pull origin main
```

Si se actualizan las dependencias del proyecto, ejecuta nuevamente:

```bash
npm install
```