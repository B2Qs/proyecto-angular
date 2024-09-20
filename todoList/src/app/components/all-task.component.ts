import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task-service.service';
import { AddTaskComponentComponent } from './add-task-component/add-task-component.component';
import { TaskItemComponentComponent } from './task-item-component/task-item-component.component';
import { TaskListComponentComponent } from './task-list-component/task-list-component.component';
import { TaskOptionsComponent } from './taskOptions.component';
import { take } from 'rxjs';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';


@Component({
    selector: 'app-all-task',
    standalone: true,
    imports: [
        CommonModule,
        HeaderComponent,
        AddTaskComponentComponent,
        TaskItemComponentComponent, 
        TaskListComponentComponent, 
        TaskOptionsComponent,
        FooterComponent
    ],
    template: `
    <section class="all-task-card">
        <app-header/>
        <app-add-task-component/>
        
        @if (tasks().length > 0) {
            <main class="task-main">
                <app-task-list-component [tasks]="filtrarTasks()"/>
                <app-task-options [tasksLeft]="taskSleft()"/>
            </main>
        }
        <app-footer/>
    </section>
    `,
    styles: `
    .all-task-card {
        max-width: 75rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1.75rem;
        margin: 0 auto;
        padding: 3.2rem;
        .task-main {
            background-color: var(--bg-task-color);
            border-radius: 1.275rem;
        }
    }
    .no-tasks {
        text-align: center;
        font-size: 1.5rem;
    }

    @media (max-width: 40em) {
        .all-task-card {
            padding: 1.6rem;
        }
    }
    `
})


export class AllTaskComponent implements OnInit {
    taskService = inject(TaskService);

    constructor() {};

    ngOnInit(): void {
        this.taskService.getTasks().pipe(take(1)).subscribe(tasks => {
            console.log('Tasks received:', tasks);
        });
    }

    // metodo para obtener todas las tareas
    get tasks() {
        return this.taskService.tasks;
    }

    // metodo de filtracion de tareas
    get filtrarTasks() {
        return this.taskService.filteredTasks;
    }

    // metodo de tareas pendientes
    get taskSleft() {
        return this.taskService.tasksLeft;
    }

}