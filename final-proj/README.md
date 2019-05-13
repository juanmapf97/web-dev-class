# Proyecto Storage
Este proyecto es desarrollado como proyecto final de la clase de Desarrollo de Aplicaciones Web. La aplicación desarrollada sirve como aplicación para una idea de negocio por la cual los usuarios pueden guardar cajas en bodegas compartidas por el periodo de tiempo que éstos quieran. Un usuario del sitio pueden crear pedidos, pedir envíos y ver información general respecto a sus cajas guardadas y montos totales mensuales.

## Requerimientos
Este proyecto fue construido en dos partes separadas, el frontend y el backend. El frontend fue desarrollado con Angular 7, mientras que el back con node y express, manejando la base de datos con Mongoose para MongoDB.

Para correr el backend del proyecto, se debe accesar a la carpeta `back/` e instalar los paquetes requeridos con npm:
```bash
npm install
```
posteriormente, ejecutar el backend con:
```bash
node index.js
```

Para correr el frontend, accesar la carpeta `front/` e instalar los paquetes requeridos con npm de la misma manera que con el back, luego correr el front con:
```bash
ng serve
```

De esta manera, se contará con la aplicación ejecutando en el ambiente de desarrollo. El servidor se encontrará en `http://localhost:3000` mientras que el frontend en `http://localhost:4200`.
