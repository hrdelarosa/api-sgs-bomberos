# SGS-Bomberos

<details>
<summary>Tabla de contenido</summary>

- [SGS-Bomberos](#sgs-bomberos)
  - [Introducción](#introducción)
    - [URL Base](#url-base)
  - [Stack](#stack)
  - [Autenticación](#autenticación)
    - [Proceso de autenticación](#proceso-de-autenticación)
    - [Flujo de autenticación](#flujo-de-autenticación)
      - [1. Iniciar sesión](#1-iniciar-sesión)
      - [2. Acceder a un endpoint protegido](#2-acceder-a-un-endpoint-protegido)
      - [3. Cerrar sesión](#3-cerrar-sesión)
    - [Seguridad](#seguridad)
  - [Endpoints](#endpoints)
  - [Códigos de estado HTTP](#códigos-de-estado-http)
    - [Repuestas exitosas (2xx)](#repuestas-exitosas-2xx)
    - [Errores del cliente (4xx)](#errores-del-cliente-4xx)
    - [Errores del servidor (5xx)](#errores-del-servidor-5xx)
  - [Ejemplos de uso](#ejemplos-de-uso)
    - [Autenticación y obtención de token](#autenticación-y-obtención-de-token)
      - [Iniciar sesión (Login)](#iniciar-sesión-login)
    - [Gestion de servicios](#gestion-de-servicios)
      - [Obtener todos los servicios](#obtener-todos-los-servicios)
      - [Registrar un nuevo servicio](#registrar-un-nuevo-servicio)
    - [Gestion del personal](#gestion-del-personal)
      - [Obtener información de los bombero](#obtener-información-de-los-bombero)
      - [Actualizar rango de un bombero](#actualizar-rango-de-un-bombero)
    - [Gestion de las unidades](#gestion-de-las-unidades)
      - [Obtener todas las unidades de bomberos](#obtener-todas-las-unidades-de-bomberos)

</details>

## Introducción

Esta API esta creada para facilitar la administración y seguimiento de los servicios, personal, unidades, guardias y estaciones que forman parte del departamento de bomberos.

Esta API permite:

- **Gestionar servicios:** Crear y administrar los servicios atendidos.
- **Administrar personal:** Manejar la información sobre los bomberos y su asignación de rango, guardias y estaciones
- **Control de unidades:** Llevar el control y la gestión de las unidades.
- **Organizar guardias:** Crear guardias y asignar guardias al personal.
- **Control de estaciones:** Llevar el control y la gestión de las estaciones.

Esta documentación describe en detalle los endpoints disponibles en la API.

### URL Base

`http://localhost:1234/api`

## Stack

- **Backend:** Node con Express
- **Base de datos:** MySQL
- **Autenticación:** JWT
- **Estándar de datos:** JSON

## Autenticación

Para acceder a la mayoría de los endpints de la API es necesario autenticarse. Solo algunos endpoinst son públicos y estarán disponibles sin autenticarse.

La API utiliza un sistema de autenticación basado en JWT (JSON Web Token) el cual se almacena y gestiona a través de cookies seguras.

### Proceso de autenticación

1. **Inicio de sesión:** El usuario envía sus credenciales a la API.
2. **Generación de token:** Si las credenciales son correctas la API generar un token JWT.
3. **Almacenamiento de las cookies:** El token se almacena en una cookie HTTP-only y segura para evitar accesos no autorizados desde JavaScript.
4. **Uso del token:** En cada solicitud a un endpoint protegido, el cliente envía la cookie con el token automáticamente.
5. **Cierre de sesión:** Para cerrar sesión la API elimina la cookie del cliente.

### Flujo de autenticación

#### 1. Iniciar sesión

`POST /api/auth/login`

- **Descripción:** Permite a los usuarios autenticarse en el sistema.
- **Parámetros de la solicitud:**

```json
{
  "email": "usuario@example.com",
  "password": "contraseña_segura"
}
```

- **Ejemplo de respuesta:**

```json
{
  "message": "Inicio de sesión exitoso"
}
```

> **📌 Nota:** El token **_NO_** se incluye en la respuesta JSON, sino que se almacena en una cookie HTTP-only.

#### 2. Acceder a un endpoint protegido

Para acceder a los endpoints protegidos, el cliente debe incluir automáticamente la cookie en la solicitud.

Ejemplo con `fetch` en el frontend:

```javascript
fetch('http://localhost:1234/api/example/protected-route', {
  method: 'GET',
  credentials: 'include', // Permite enviar cookies en la solicitud
})
  .then((response) => response.json())
  .then((data) => console.log(data))
```

#### 3. Cerrar sesión

`POST /api/auth/logout`

- **Descripción:** Elimina la cookie que contiene el token y finaliza la sesión.
- **Ejemplo de respuesta:**

```json
{
  "message": "Cierre de sesión exitoso"
}
```

### Seguridad

- **🔐 HTTP-only Cookies:** El token se almacena en cookies con la opción HttpOnly activada para evitar accesos desde JavaScript.
- **🔒 SameSite & Secure:** Se recomienda configurar la cookie con SameSite=Strict y Secure=true en producción.

```javascript
res.cookie('token', jwtToken, {
  httpOnly: true,
  secure: true, // Solo en HTTPS
  sameSite: 'Strict', // Evita CSRF
})
```

Con este sistema, la autenticación es más segura al evitar que el token sea accesible desde JavaScript, reduciendo el riesgo de ataques XSS.

## Endpoints

A continuación, se describen los principales endpoints de la API de Gestión del Departamento de Bomberos.

> **📌 Nota:**
>
> - Todos los endpoints protegidos requieren autenticación mediante cookies (ver sección de autenticación).
> - Las respuestas son en formato JSON.

Estos son todos los endpoints dentro de la API:

| 🆎 Nombre                                        | 🚀 Tipo         | 🔗 URL                                                         | 📄 Descripción                                                                                                               |
| ------------------------------------------------ | --------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Iniciar sesión                                   | `POST`          | `/api/auth/login`                                              | Permite al usuario autenticarse                                                                                              |
| Registrarse                                      | `POST`          | `/api/auth/register`                                           | Permite al usuario autenticarse                                                                                              |
| Cerrar sesión                                    | `POST`          | `/api/auth/logout`                                             | Permite al usuario autenticarse                                                                                              |
| Obtener perfil                                   | `GET`           | `/api/auth/profile/:id`                                        | Permite al usuario autenticarse                                                                                              |
| Verificar token                                  | `GET`           | `/api/auth/verify-token`                                       | Permite al usuario autenticarse                                                                                              |
| Refrescar token                                  | `POST`          | `/api/auth/refresh-token`                                      | Permite al usuario autenticarse                                                                                              |
| Verificar correo                                 | `POST`          | `/api/auth/verify-email`                                       | Permite al usuario autenticarse                                                                                              |
| Reenviar verificación                            | `POST`          | `/api/auth/resend-verify-email`                                | Permite al usuario autenticarse                                                                                              |
| Solicitar restablecimiento de contraseña         | `POST`          | `/api/auth/request-password-reset`                             | Permite al usuario autenticarse                                                                                              |
| Restablecer contraseña                           | `POST`          | `/api/auth/reset-password`                                     | Permite al usuario autenticarse                                                                                              |
| **_Guardias_**                                   | **-----------** | **----------------------------------------------------------** | **-----------------------------------------------------------------------------------------------------**                    |
| Crear una guardia                                | `POST`          | `/api/guards/create`                                           | Permite al usuario crear una nueva guardia                                                                                   |
| Eliminar una guardia                             | `DELETE`        | `/api/guards/delete/:id`                                       | Permite al usuario eliminar una guardia                                                                                      |
| Recuperar las guardias                           | `GET`           | `/api/guards`                                                  | Recupera todas las guardias                                                                                                  |
| Recuperar las guardias vinculadas a una estación | `GET`           | `/api/guards/:id_estación`                                     | Recupera todas las guardias que están relacionas con cierta estación                                                         |
| **_Personal_**                                   | **-----------** | **----------------------------------------------------------** | **-----------------------------------------------------------------------------------------------------**                    |
| Crear un personal                                | `POST`          | /`api/personnel/create`                                        | Permite al usuario crear un nuevo personal                                                                                   |
| Actualiza el estado del personal                 | `PATCH`         | /`api/personnel/state/:id_estado`                              | Permite al usuario actualizar el estado del personal                                                                         |
| Elimina un personal                              | `DELETE`        | /`api/personnel/delete/:id`                                    | Permite al usuario eliminar un personal                                                                                      |
| Recuperar el personal                            | `GET`           | /`api/personnel`                                               | Recupera todo el personal                                                                                                    |
| Recuperar el personal por rango                  | `GET`           | /`api/personnel/rank/:id_rango`                                | Recupera todo el personal relacionado por un rango                                                                           |
| Recuperar el personal por guardia                | `GET`           | /`api/personnel/guard/:id_guardia`                             | Recupera todo el personal relacionado por una guardia                                                                        |
| Actualizar el rango del personal                 | `PATCH`         | /`api/personnel/rank/:id_rango`                                | Permite al usuario actualizar el rango del personal                                                                          |
| Actualizar la guardia del personal               | `PATCH`         | /`api/personnel/guard/:id_guardia`                             | Permite al usuario actualizarla guardia del personal                                                                         |
| **_Rangos_**                                     | **-----------** | **----------------------------------------------------------** | **-----------------------------------------------------------------------------------------------------**                    |
| Crear un rango                                   | `POST`          | `/api/ranks/create`                                            | Permite al usuario crear un nuevo rango                                                                                      |
| Actualiza el estado del rango                    | `PATCH`         | `/api/ranks/state/:id_estado`                                  | Permite al usuario actualizar el estado del rango                                                                            |
| Elimina un rango                                 | `DELETE`        | `/api/ranks/delete/:id`                                        | Permite al usuario eliminar un rango                                                                                         |
| Recuperar los rangos                             | `GET`           | `/api/ranks`                                                   | Recupera todos los rangos                                                                                                    |
| **_Roles_**                                      | **-----------** | **----------------------------------------------------------** | **-----------------------------------------------------------------------------------------------------**                    |
| Crear un rol                                     | `POST`          | `/api/roles/create`                                            | Permite al usuario crear un nuevo rol                                                                                        |
| Actualiza el estado del rol                      | `PATCH`         | `/api/roles/state/:id_estado`                                  | Permite al usuario actualizar el estado del rol                                                                              |
| Elimina un rol                                   | `DELETE`        | `/api/roles/delete/:id`                                        | Permite al usuario eliminar un rol                                                                                           |
| Recuperar los roles                              | `GET`           | `/api/roles`                                                   | Recupera todos los roles                                                                                                     |
| **_Servicios_**                                  | **-----------** | **----------------------------------------------------------** | **-----------------------------------------------------------------------------------------------------**                    |
| Crear un servicio                                | `POST`          | `/api/services/create`                                         | Permite al usuario crear un nuevo servicio                                                                                   |
| Elimina un servicio                              | `DELETE`        | `/api/services/delete/:id`                                     | Permite al usuario eliminar un rol                                                                                           |
| Recuperar los servicios                          | `GET`           | `/api/services?page=n`                                         | Recupera todos los servicios, este tiene paginación por ende solo devuelve los primero n servicios de esa pagina             |
| Recuperar un servicio                            | `GET`           | `/api/services/:id`                                            | Recupera un servicio en específico por el id                                                                                 |
| Recupera los servicios por un usuario            | `GET`           | `/api/services/creator/:id_usuario?limit=n`                    | Recupera todos los servicios que ha creado un usuario, este tiene un límite por ende solo devolverá los primeros n servicios |
| **_Estados de los servicios_**                   | **-----------** | **----------------------------------------------------------** | **-----------------------------------------------------------------------------------------------------**                    |
| Recuperar los estados de los servicios           | `GET`           | `/api/states/services`                                         | Recupera todos los estados de los servicios                                                                                  |
| **_Estados_**                                    | **-----------** | **----------------------------------------------------------** | **-----------------------------------------------------------------------------------------------------**                    |
| Recuperar los estados                            | `GET`           | `/api/states`                                                  | Recupera todos los estados                                                                                                   |
| **_Estaciones_**                                 | **-----------** | **----------------------------------------------------------** | **-----------------------------------------------------------------------------------------------------**                    |
| Crear una estación                               | `POST`          | `/api/stations/create`                                         | Permite al usuario crear una nueva estación                                                                                  |
| Actualiza el estado de una estación              | `PATCH`         | `/api/stations/state/:id_estado`                               | Permite al usuario actualizar el estado de una estación                                                                      |
| Elimina una estación                             | `DELETE`        | `/api/stations/delete/:id`                                     | Permite al usuario eliminar una estación                                                                                     |
| Recuperar las estaciones                         | `GET`           | `/api/stations`                                                | Recupera todas las estaciones                                                                                                |
| **_Unidades_**                                   | **-----------** | **-------------------------------------------------**          | **-----------------------------------------------------------------------------------------------------**                    |
| Crear una unidad                                 | `POST`          | `/api/units/create`                                            | Permite al usuario crear una nueva unidad                                                                                    |
| Actualiza el estado de una unidad                | `PATCH`         | `/api/units/state/:id_estado`                                  | Permite al usuario actualizar el estado de una unidad                                                                        |
| Elimina una unidad                               | `DELETE`        | `/api/units/delete/:id`                                        | Permite al usuario eliminar una unidad                                                                                       |
| Recuperar las unidades                           | `GET`           | `/api/units`                                                   | Recupera todas las unidades                                                                                                  |
| **_Tipos de unidad_**                            | **-----------** | **----------------------------------------------------------** | **-----------------------------------------------------------------------------------------------------**                    |
| Crear un tipo de unidad                          | `POST`          | `/api/types/create`                                            | Permite al usuario crear un nuevo tipo de unidad                                                                             |
| Actualiza el estado de un tipo de unidad         | `PATCH`         | `/api/types/state/:id_esatdo`                                  | Permite al usuario actualizar el estado de un tipo de unidad                                                                 |
| Elimina un tipo de unidad                        | `DELETE`        | `/api/types/delete/:id`                                        | Permite al usuario eliminar un tipo de unidad                                                                                |
| Recuperar los tipos de unidad                    | `GET`           | `/api/types`                                                   | Recupera todos los tipos de unidad                                                                                           |
| **_Usuarios_**                                   | **-----------** | **----------------------------------------------------------** | **-----------------------------------------------------------------------------------------------------**                    |
| Actualiza el estado de un usuario                | `PATCH`         | `/api/users/state/:id_estado`                                  | Permite al usuario actualizar el estado de un usuario                                                                        |
| Actualiza el rol de un usuario                   | `PATCH`         | `/api/users/role/:id_rol`                                      | Permite al usuario actualizar el rol de un usuario                                                                           |
| Elimina un usuari                                | `	DELETE`        | `/api/users/delete/:id`                                        | Permite al usuario eliminar un usuario                                                                                       |
| Recuperar los usuarios                           | `GET`           | `/api/users`                                                   | Recupera todos los usuarios                                                                                                  |
| Recupera un usuario por el id                    | `GET`           | `/api/users/:id`                                               | Recupera un usuario por el id                                                                                                |

## Códigos de estado HTTP

A continuación, se detallarán los códigos de estado HTTP utilizados en la API junto su significado y ejemplos de uso.

### Repuestas exitosas (2xx)

| **Código**        | **Descripción**                        | **Ejemplo de uso**                                       |
| ----------------- | -------------------------------------- | -------------------------------------------------------- |
| **_200_** OK      | La solicitud se procesó correctamente. | Al obtener la lista de las unidades `(GET /api/units)`   |
| **_201_** Created | Un recurso fue creado exitosamente.    | Al registrar una nueva unidad `(POST /api/units/create)` |

### Errores del cliente (4xx)

| **Código**             | **Descripción**                                        | **Ejemplo de uso**                                                         |
| ---------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------- |
| **_400_** Bad Request  | La solicitud es inválida o contiene datos incorrectos. | Si falta un campo requerido al crear una unidad `(POST /api/units/create)` |
| **_401_** Unauthorized | El usuario no está autenticado.                        | Si un usuario intenta acceder a `(GET /api/units)` sin iniciar sesión.     |
| **_403_** Forbidden    | El usuario no tiene permisos para acceder al recurso.  | Si un usuario sin correo verificado intenta iniciar sesión.                |
| **_404_** Not Found    | El recurso solicitado no existe.                       | Si se elimina una guardia con un id que no está registrado.                |
| **_409_** Conflict     | Existe un conflicto con los datos.                     | Si se intenta registrar una unidad con un número que ya existe.            |

### Errores del servidor (5xx)

| **Código**                      | **Descripción**                               | **Ejemplo de uso**                            |
| ------------------------------- | --------------------------------------------- | --------------------------------------------- |
| **_500_** Internal Server Error | Error interno en el servidor.                 | Si ocurre una excepción inesperada en la API. |
| **_503_** Service Unavailable   | El servidor no está disponible temporalmente. | Si la base de datos está caída.               |

## Ejemplos de uso

A continuación, se presentan ejemplos prácticos de cómo interactuar con la API utilizando solicitudes HTTP.

### Autenticación y obtención de token

#### Iniciar sesión (Login)

- **Endpoint:** `POST` `/api/auth/login`
- **Descripción:** Permite a un usuario autenticarse y recibir un token almacenado en cookies.
- **Solicitud:**

```json
{
  "correo": "example@example.com",
  "contraseña": "login123"
}
```

- **Respuesta exitosa** `(200 OK)`:

```json
{
  "message": "Inicio de sesión exitoso"
}
```

> **📌 Nota:** El **token** se almacena en cookies automáticamente.

### Gestion de servicios

#### Obtener todos los servicios

- **Endpoint:** `GET` `/api/services`
- **Descripción:** Devuelve una lista de todos los servicios registrados.
- **Solicitud:**

```http
GET /api/services?page=1 HTTP/1.1
Host: http://localhost:1234
Cookie: token=ejemploDeToken
```

- **Respuesta exitosa** `(200 OK)`:

```json
{
  "message": "Servicios obtenidos correctamente",
  "totalPages": 1,
  "totalServices": 5,
  "servicesPerPage": 20,
  "services": [
    {
      "id": "58f33fb4-361b-4d83-b6c0-e44e5c3fadd0",
      "us_nombres": "Super Usuario",
      "ser_creado": "2025-03-17T06:00:00.000Z",
      "ser_nombre": "Alejandra Lopez",
      "ser_telefono": "9211734040",
      "ser_incidente": "abejas",
      "ser_ubicacion": "Calle 15 entre calle 19 Col. Icacos",
      "ser_folio": "20250317-0004",
      "ser_observaciones": "Se talo un arbol de roble que estaba recargado sobre una barda",
      "estser_id_ser": "nuevo"
    },
    {
      "id": "8a1fb88f-2df8-41e2-9052-2f6090214d23",
      "us_nombres": "Super Usuario",
      "ser_creado": "2025-03-17T06:00:00.000Z",
      "ser_nombre": "Alejandra Lopez",
      "ser_telefono": "9211734040",
      "ser_incidente": "abejas",
      "ser_ubicacion": "Calle 15 entre calle 19 Col. Icacos",
      "ser_folio": "20250317-0006",
      "ser_observaciones": "Se talo un arbol de roble que estaba recargado sobre una barda",
      "estser_id_ser": "nuevo"
    },
    ...
  ]
}
```

#### Registrar un nuevo servicio

- **Endpoint:** `POST` `/api/services/create`
- **Descripción:** Permite registrar un nuevo servicio.
- **Solicitud:**

```json
{
  {
  "usuario": "71c38445-6bc3-bb17-11c3-afc2b9c391c2",
  "nombre": "Alejandra Lopez",
  "telefono": "9211734040",
  "salida": "02:10",
  "llegada": "02:20",
  "control": "02:40",
  "base": "02:55",
  "incidente": "abejas",
  "ubicacion": "Calle 15 entre calle 19 Col. Icacos",
  "otro": "",
  "observaciones": "Se talo un arbol de roble que estaba recargado sobre una barda",
  "unidades": [
    "3fc292c3-aec2-b2c3-bac3-b111c3afc2b9",
    "3fc292c3-b335-c3ba-c3b1-11c3afc2b9c3"
  ],
  "personal": [
    "1d2316c2-92c3-bb06-11c3-afc2b9c391c2",
    "1d233111-c3bb-0611-c3af-c2b9c391c2a2",
    "1d2326c3-b6c3-bb06-11c3-afc2b9c391c2",
    "1d2346c2-a5c3-bb06-11c3-afc2b9c391c2"
  ],
  "incendio": {
    "inmueble": "",
    "inmEspecifique": "",
    "otro": "",
    "otrEspecifique": ""
  },
  "fugaDerrame": {
    "fuga": "",
    "capacidad": "",
    "especifique": "",
    "empresa": "",
    "noGuia": "",
    "material": "",
    "observaciones": ""
  },
  "abejas": {
    "abeja": "",
    "especifique": "",
    "observaciones": ""
  },
  "rescate": {
    "heridos": "",
    "cadaveres": "",
    "ambulancia": "",
    "equipo": "",
    "noPersonal": "",
    "especifique": ""
  },
  "daños": {
    "material": "",
    "especifique": "",
    "heridos": "",
    "muertos": "",
    "ambulancia": ""
  },
  "legales": {
    "legal": "",
    "otro": ""
  }
}
}
```

- **Respuesta exitosa** `(201 Created)`:

```json
{
  "message": "Servicio creado correctamente"
}
```

### Gestion del personal

#### Obtener información de los bombero

- **Endpoint:** `GET` `/api/personnel`
- **Descripción:** Devuelve una lista de todos los bomberos registrados.
- **Solicitud:**

```http
GET /api/personnel HTTP/1.1
Host: http://localhost:1234
Cookie: token=ejemploDeToken
```

- **Respuesta exitosa** `(200 OK)`:

```json
{
  "message": "Personal obtenido correctamente",
  "personnel": [
    {
      "id": "1d232cc2-95c3-bb06-11c3-afc2b9c391c2",
      "per_nombres": "Silvia Alejandra",
      "per_apellidos": "Torres Romero",
      "per_np": 2345,
      "ran_nombre": "bombero",
      "per_base": "sindicalizado",
      "gu_nombre": "1er Guardia",
      "et_nombre": "Cuartel de Bomberos Acapulco - Central Farallon",
      "per_diasEco": 9,
      "per_vacaciones": 2,
      "est_id_per": null
    },
    {
      "id": "1d230028-c3bb-0611-c3af-c2b9c391c2a2",
      "per_nombres": "Carlos Eduardo",
      "per_apellidos": "Gomez HernÃ¡ndez",
      "per_np": 125,
      "ran_nombre": "teniente",
      "per_base": "supernumerario",
      "gu_nombre": "1er Guardia",
      "et_nombre": "Cuartel de Bomberos Acapulco - Central Farallon",
      "per_diasEco": 9,
      "per_vacaciones": 2,
      "est_id_per": null
    },
    ...
  ]
}
```

#### Actualizar rango de un bombero

- **Endpoint:** `POST` `/api/personnel/rank/{id}`
- **Descripción:** Permite a un usuario autenticarse y recibir un token almacenado en cookies.
- **Solicitud:**

```json
{
  "estado": "a52e31fe-faea-11ef-b9d1-a2cc1a1d4502"
}
```

- **Respuesta exitosa** `(200 OK)`:

```json
{
  "message": "El rango del personal ha sido actualizado correctamente"
}
```

### Gestion de las unidades

#### Obtener todas las unidades de bomberos

- **Endpoint:** `GET` `/api/units`
- **Descripción:** Devuelve una lista de todas las unidades registradas.
- **Solicitud:**

```http
GET /api/units HTTP/1.1
Host: http://localhost:1234
Cookie: token=ejemploDeToken
```

- **Respuesta exitosa** `(200 OK)`:

```json
{
  "message": "Unidades obtenidas correctamente",
  "units": [
    {
      "id": "3fc292c2-b8c2-8ac3-bac3-b111c3afc2b9",
      "tu_id_uni": "ambulancias",
      "uni_numero": "24",
      "est_id_uni": "activo"
    },
    {
      "id": "3fc292c3-95c2-9bc3-bac3-b111c3afc2b9",
      "tu_id_uni": "ambulancias",
      "uni_numero": "35",
      "est_id_uni": "activo"
    },
    ...
  ]
}
```

Estos son algunos ejemplos de uso de la API.
