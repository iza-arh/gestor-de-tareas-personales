# Guia para montar y ejecutar el proyecto

Este proyecto es una aplicacion React creada con Vite para gestionar tareas mediante operaciones CRUD: crear, consultar, actualizar y eliminar.

## Requisitos previos

Antes de ejecutar el proyecto, asegurese de tener instalado:

- Node.js
- npm
- Visual Studio Code
- Un navegador web como Chrome, Edge o Firefox

Para comprobar si Node.js y npm estan instalados, abra una terminal y ejecute:

```bash
node -v
npm -v
```

Si ambos comandos muestran una version, el entorno esta listo.

## 1. Abrir el proyecto

Abra Visual Studio Code y seleccione la carpeta del proyecto:

```txt
gestor-de-tareas-personales
```

Tambien puede abrirlo desde terminal con:

```bash
code .
```

## 2. Instalar dependencias

Dentro de la carpeta principal del proyecto, ejecute:

```bash
npm install
```

Este comando instala todas las librerias necesarias definidas en `package.json`, incluyendo React, Vite, React Router, Tailwind CSS y HeroUI.

## 3. Ejecutar el servidor de desarrollo

Para levantar la aplicacion localmente, ejecute:

```bash
npm run dev
```

Vite mostrara una URL similar a:

```txt
http://localhost:5173/
```

Abra esa direccion en el navegador. Para entrar directamente al CRUD de tareas, use:

```txt
http://localhost:5173/tareas
```

## 4. Probar el CRUD de tareas

En la pantalla principal puede probar las operaciones:

1. Crear una tarea desde el formulario "Nueva tarea".
2. Consultar la tarea en el listado.
3. Actualizar una tarea con el boton "Editar".
4. Cambiar el estado desde el selector de la tarjeta.
5. Eliminar una tarea con el boton "Eliminar".
6. Buscar tareas usando el campo "Buscar tarea".
7. Filtrar tareas por estado.

Los datos se guardan en `localStorage`, por lo que permanecen disponibles aunque se recargue la pagina.

## 5. Validar el proyecto

Para revisar errores de estilo o reglas de React, ejecute:

```bash
npm run lint
```

Para generar una version de produccion, ejecute:

```bash
npm run build
```

Si el build termina correctamente, se creara una carpeta `dist` con los archivos listos para publicacion.

## 6. Previsualizar la version de produccion

Despues de ejecutar `npm run build`, puede probar la version generada con:

```bash
npm run preview
```

Vite mostrara una URL local para revisar la aplicacion compilada.

## 7. Estructura principal del CRUD

Los archivos principales del CRUD estan organizados asi:

```txt
src/
  components/
    tasks/
      TaskForm.jsx
      TaskFilters.jsx
      TaskItem.jsx
      TaskList.jsx
  hooks/
    useTasks.js
  pages/
    TasksPage.jsx
  services/
    taskStorage.js
```

Descripcion breve:

- `TaskForm.jsx`: formulario para crear y editar tareas.
- `TaskList.jsx`: listado de tareas.
- `TaskItem.jsx`: tarjeta individual de cada tarea.
- `TaskFilters.jsx`: busqueda y filtro por estado.
- `useTasks.js`: logica principal del CRUD.
- `taskStorage.js`: persistencia en `localStorage`.
- `TasksPage.jsx`: pagina que une formulario, filtros y listado.

## 8. Comandos utiles

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

## 9. Notas importantes

- No se necesita una base de datos externa.
- No se necesita backend para esta version.
- La persistencia se realiza con `localStorage`.
- Si desea borrar todos los datos guardados, puede limpiar el almacenamiento local desde las herramientas de desarrollo del navegador.
