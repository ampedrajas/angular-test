# Angular

Este proyecto se ha generado con la versión 14.2.5 de [Angular CLI](https://github.com/angular/angular-cli). Se recomienda utilizar la versión 14.16.0 LTS de [Node.js](https://nodejs.org/es/) para el desarrollo de la aplicación.

## Instalación
```bash
npm install
```

## Serve

Para arrancar DEV:

```bash
npm run serve:dev
```

Para arrancar PRE:

```bash
npm run serve:pre
```

Para arrancar PRO:

```bash
npm run serve:pro
```

## Build

El build se almacenará en la carpeta `dist/`.

Build apuntando a DEV:

```bash
npm run build:dev
```

Build apuntando a PRE:

```bash
npm run build:pre
```

Build apuntando a PRO:

```bash
npm run build:pro
```

## Material
Estamos usando el paquete de [Angular material](https://material.angular.io/guide/getting-started). Es importante que la versión de Angular y de Angular Material sea la misma.

## Internacionalización
**Añadir idioma**: en el fichero `/src/app/core/constants/constant.ts`, configuramos la propiedad **CONST.internationalization.availableLanguages**. Hay que crear el fichero en `/src/assets/i18n/{language-code}.json`

**Idioma por defecto**: en el archivo `/src/app/core/constants/constant.ts`, configuramos la propiedad CONST.internationalization.defaultLanguage.

## Traducción de cadenas de texto
Utilizamos la librería [@ngx-translate/core](https://www.npmjs.com/package/@ngx-translate/core) y [@ngx-translate/http-loader](https://www.npmjs.com/package/@ngx-translate/http-loader).

Se recomienda añadir las etiquetas de texto en orden alfabético para mejorar su legibilidad.

## Localización
En el fichero `src/app/core/constants/constant.ts` configuramos el código de localización para la gestión de fechas en la aplicación en la propiedad **CONST.localization.code**.

En los ficheros con modelos que tengan una propiedad de fecha, debemos formatearlo con la librería Momentjs, for example:
```ts
this.formattedExpirationDate = moment(data.expirationDate).locale(CONST.localization.code).format('L');
```

Tenemos que importar el locale en `app.module.ts`, por ejemplo: **registerLocaleData(localeEs, 'es')**. El locale **en** está registrado por defecto en Angular.
