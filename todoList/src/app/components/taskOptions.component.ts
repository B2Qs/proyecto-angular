import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskServiceService } from '../services/task-service.service';
import { TaskOption } from '../interfaces/estado-task';
import { Task } from '../interfaces/task';
import { take } from 'rxjs';


@Component({
    selector: 'app-task-options',
    standalone: true,
    imports: [CommonModule],
    template: `
           <div class="task-container">
        <div class="task-options">
            <p class="tasks-left">{{ tasksLeft }} items left</p>
            <ul class="main-options">
        @for(option of taskOptions; track $index) {
        <li>
          <button
            class="option-btn option-btn--primary"
            [ngClass]="{ active: option === selecTaskOption }"
            (click)="onSelect(option)"
          >
            {{ option | titlecase }}
          </button>
        </li>
        }
      </ul>
      <button
        class="option-btn option-btn--secondary"
        (click)="onClearCompleted()"
      >
        Clear completed
      </button>
    </div>
    `
})
export class TaskOptionsComponent {
    @Input({ required: true }) tasksLeft: number = 0;

    taskService = inject(TaskServiceService);

    // METODO DE MARCAR COMPLETADO
    toggleCompleted(task: Task): void {
        task.completed = !task.completed;
        this.taskService.updateTask(task);
    }

    // METODO DE SELECCION
    get selecTaskOption(){
        return this.taskService.optionSelect();
    }

    // METODO DE SELECCION DE OPCION
    changeFilter(option: TaskOption){
        this.taskService.optionSelect.set(option);
    }

    taskOptions: TaskOption[] = ['all', 'active', 'completed'];

    // METODO DE MARCAR COMPLETADO
    onSelect(taskOption: TaskOption){
        this.taskService.selecTaskOption(taskOption)
    }

    // METODO DE BORRAR TAREA
    onClearCompleted(){
        this.taskService.clearCompletedTask().pipe(take(1)).subscribe();
    }

}