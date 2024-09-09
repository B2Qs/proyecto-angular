import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskServiceService } from '../services/task-service.service';
import { AddTaskComponentComponent } from './add-task-component/add-task-component.component';
import { TaskItemComponentComponent } from './task-item-component/task-item-component.component';
import { TaskListComponentComponent } from './task-list-component/task-list-component.component';
import { TaskOptionsComponent } from './taskOptions.component';
import { take } from 'rxjs';


@Component({
    selector: 'app-all-task',
    standalone: true,
    imports: [
        CommonModule,
        AddTaskComponentComponent,
        TaskItemComponentComponent, 
        TaskListComponentComponent, 
        TaskOptionsComponent
    ],
    template: `
    <section class="all-task-card">
  <app-add-task-component></app-add-task-component>
  
  <!-- Utilisation correcte de *ngIf -->
  <main class="task-main" *ngIf="tasks.length > 0; else noTasks">
    <app-task-list-component [tasks]="filtrarTasks"></app-task-list-component>
    <app-task-options [tasksLeft]="taskSleft"></app-task-options>
  </main>

  <!-- Template à afficher s'il n'y a pas de tâches -->
  <ng-template #noTasks>
    <p class="no-tasks">No tasks</p>
  </ng-template>
</section>

    `,
    styles: `
    .all-task-card {
        max-width: 55rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin: 0 auto;
        padding: 3.2rem;
        .task-main {
        display: flex;
        justify-content: space-between;
        background-color: var(--bg-task-color);
        }
    }
    .no-tasks {
        text-align: center;
        font-size: 1.5rem;
    }
    `
})
export class AllTaskComponent implements OnInit {
    taskService = inject(TaskServiceService);

    constructor(private cdr: ChangeDetectorRef) {};

    // metodo para obtener todas las tareas
    get tasks() {
        return this.taskService.tasks();
    }

    // metodo de filtracion de tareas
    get filtrarTasks() {
        return this.taskService.filtrarTasks();
    }

    // metodo de tareas pendientes
    get taskSleft() {
        return this.taskService.taskSleft();
    }

    ngOnInit(): void {
        this.taskService.getTasks().pipe(take(1)).subscribe(tasks => {
            console.log('Tasks received:', tasks);
            this.cdr.detectChanges(); 
        });
    }


}