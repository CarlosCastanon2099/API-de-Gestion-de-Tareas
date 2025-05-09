<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![GNU General Public License v3.0][license-shield]][license-url]

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
<!--
-->


# <img src="https://media.tenor.com/Hn70w3PSho4AAAAi/gaycat1337.gif" width="50"> **API de Gestion de Tareas ​** <img src="https://media.tenor.com/Hn70w3PSho4AAAAi/gaycat1337.gif" width="50">

</div>



https://github.com/user-attachments/assets/92649336-18d1-439b-9999-5be115744a18



----
## **Made by:** <br> <img src="https://media.tenor.com/m6cM9lV-doYAAAAi/batman-batman-beyond.gif" width="30"> **Mr-Quantum** 




## **Objetivo del proyecto:**
El objetivo de este proyecto es el de tener una API para gestionar tareas.

En concreto una API que puede realizar las operaciones;

```C#
Crear una tarea (POST /tasks)
Consultar una lista de tareas (GET /tasks)
Consultar detalle de una tarea (GET /tasks/{id})
Actualizar el estado de una tarea (PUT /tasks/{id})
Eliminar una tarea (DELETE /tasks/{id})
```

Con los siguientes tipos de datos;

| Campo         | Tipo                                        |
|---------------|---------------------------------------------|
| id            | UUID                                        |
| title         | String                                      |
| description   | String                                      |
| dueDate       | Date (ISO 8601)                             |
| status        | Enum: "pending", "in-progress", "completed" |




-------------

## **Requerimientos**


[![Docker 28.1.1](https://img.shields.io/badge/Docker-28.1.1-blue.svg)](https://www.docker.com/products/docker-desktop/)


## **Uso**

Para correr la API tenemos que ejecutar los siguientes comandos;

Windows

```Python
docker build --no-cache -t todo-api .
```

```Python
docker run --rm -it todo-api sh -c "npm install --include=dev && npm run test"
```


```Python
docker run -d --name todo-api-container -p 3000:3000 todo-api
```

Para consultar la documentacion de Swagger ir a;

```Python
http://localhost:3000/api-docs
```

Una vez que tenemos levantado el contenedor de Docker, ahora, podemos probar la API.

Para registrar una tarea, deberemos ejecutar;

```Python
Invoke-RestMethod `
  -Uri "http://localhost:3000/tasks" `
  -Method Post `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"title": "Nombre de la Tarea",
    "description": "Descripciónde la Tarea",
    "dueDate":"Fecha em formato ISO 8601",
    "status": "pending", "in-progress" o "completed"
  }'
```

Ejemplo:
```Python
Invoke-RestMethod `
  -Uri "http://localhost:3000/tasks" `
  -Method Post `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"title": "Comprar comida para gato",
    "description": "Comprar saco de alimento premium antes de las 9pm",
    "dueDate":"2025-05-10T21:00:00.000Z",
    "status": "pending"
  }'
```

Para ver la lista de tareas registradas, debemos ejecutar;

```Python
Invoke-RestMethod -Uri http://localhost:3000/tasks -Method Get | Format-Table
```

O en su defecto tambien podriamos ejecutar;

```Python
Invoke-RestMethod `
  -Uri "http://localhost:3000/tasks/$taskId" `
  -Method Get
```

Para Actualizar o Eliminar una tarea, debemos ejecutar lo siguiente para poder obtener el id de la tarea en cuestion;

```Python
Invoke-RestMethod `
  -Uri "http://localhost:3000/tasks/$taskId" `
  -Method Get
```

Una vez que tenemos el id, ejecutamos;

```Python
$taskId = '00-ID-00'
```

Ahora, si queremos Actualizar una tarea, ejecutamos;

```Python
$updated = Invoke-RestMethod `
  -Uri "http://localhost:3000/tasks/$taskId" `
  -Method Put `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"status":"pending", "in-progress" o "completed"}'
```

```Python
Write-Host "Nueva situación:" $updated.status
```


Ahora, si queremos Eliminar una tarea, ejecutamos;

```Python
Invoke-RestMethod `
  -Uri "http://localhost:3000/tasks/$taskId" `
  -Method Delete
```

```Python
Write-Host "Tarea $taskId eliminada"
```


[contributors-shield]: https://img.shields.io/github/contributors/CarlosCastanon2099/API-de-Gestion-de-Tareas.svg?style=for-the-badge
[contributors-url]: https://github.com/CarlosCastanon2099/API-de-Gestion-de-Tareas/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/CarlosCastanon2099/API-de-Gestion-de-Tareas.svg?style=for-the-badge
[forks-url]: https://github.com/CarlosCastanon2099/API-de-Gestion-de-Tareas/network/members
[stars-shield]: https://img.shields.io/github/stars/CarlosCastanon2099/API-de-Gestion-de-Tareas.svg?style=for-the-badge
[stars-url]: https://github.com/CarlosCastanon2099/API-de-Gestion-de-Tareas/stargazers
[issues-shield]: https://img.shields.io/github/issues/CarlosCastanon2099/API-de-Gestion-de-Tareas.svg?style=for-the-badge
[issues-url]: https://github.com/CarlosCastanon2099/API-de-Gestion-de-Tareas/issues
[license-shield]: https://img.shields.io/github/license/CarlosCastanon2099/API-de-Gestion-de-Tareas.svg?style=for-the-badge
[license-url]: https://github.com/CarlosCastanon2099/API-de-Gestion-de-Tareas/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 


