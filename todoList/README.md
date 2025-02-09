# TodoList con Angular

Aplicación de gestión de tareas (Todo-list) desarrollada con **Angular**, **Angular Material**, **SCSS** y **RxJS**. Permite a los usuarios agregar, editar, eliminar y marcar tareas como completadas. El estado de las tareas se almacena en `localStorage` para persistencia local.

## Estructura del Proyecto

- **src/app/interfaces**: Definiciones de interfaces, como `Task`.
- **src/app/services**: Servicios, incluyendo `TaskService` para operaciones CRUD.
- **src/app/components**: Componentes como `TaskItemComponent` para gestionar tareas.
- **assets**: Recursos estáticos como imágenes.

## Funcionalidades Principales

- **Agregar tareas**: Formulario para añadir nuevas tareas.
- **Editar tareas**: Modificación de tareas existentes.
- **Eliminar tareas**: Eliminación de tareas de la lista.
- **Marcar como completada**: Cambio de estado de una tarea con retroalimentación visual.
- **Persistencia**: Uso de `localStorage` para guardar el estado de las tareas.
- **RxJS**: Gestión de suscripciones y estado en el servicio.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/B2Qs/proyecto-angular.git
   cd proyecto-angular/todoList
