Gestión de Tareas con Angular

Este proyecto es una aplicación de gestión de tareas (Todo-list) construida con Angular, Angular Material, SCSS y RxJS. La aplicación permite a los usuarios agregar, editar, eliminar y marcar tareas como completadas. El estado de las tareas se almacena en localStorage.

Estructura del Proyecto

    src/app/interfaces: Definiciones de las interfaces utilizadas (como Task).
    src/app/services: Contiene los servicios, incluido TaskService para gestionar las operaciones CRUD de las tareas.
    src/app/components: Contiene los componentes como TaskItemComponent para representar y manipular tareas.
    assets: Imágenes y recursos estáticos.

Funcionalidades Principales

    Agregar tareas: Utiliza un formulario para añadir tareas nuevas a la lista.
    Editar tareas: Permite la edición de tareas existentes.
    Eliminar tareas: Los usuarios pueden eliminar tareas de la lista.
    Marcar como completada: Cambia el estado de una tarea y se refleja visualmente.
    Persistencia: Usa localStorage para guardar el estado de las tareas localmente.
    RxJS: Se utiliza para manejar las suscripciones y la gestión de estado en el servicio.

Instalación

    Clona el repositorio:

    bash

git clone https://github.com/usuario/gestion-tareas-angular.git
cd gestion-tareas-angular

Instala las dependencias:

bash

    npm install

Ejecución

Para ejecutar la aplicación en modo de desarrollo:

bash

ng serve

La aplicación estará disponible en http://localhost:4200.
Pruebas Unitarias

Para ejecutar las pruebas unitarias:

bash

ng test

Las pruebas se ejecutan con Karma y Jasmine.
Contribuir

Se aceptan pull requests para mejorar la funcionalidad, corregir errores o añadir nuevas características.
