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
      <button class="option-btn option-btn--secondary"
      (click)="onClearCompleted()">
        Clear completed
      </button>
    </div>
    `,
    styles: `
      .task-container{
        padding: 1.6rem 2.4rem 1.6rem 2.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .tasks-left{
          font-size: 1.4rem;
          line-height: 1.4rem;
          letter-spacing: -0.19px; 
          color: var(--text-color-400);
          transition: all 0.3s;
        }
        .main-options {
        list-style-type: none;
        display: flex;
        gap: 1.9rem;
        &:li {
          height: 1.4rem;
        }
      }
      .option-btn {
          border: none;
          outline: none;
          background: transparent;
          color: var(--text-color-400);
          font-family: inherit;
          font-size: 1.4rem;
          line-height: 1.4rem;
          letter-spacing: -0.19px;
          cursor: pointer;
          transition: all 0.3s;
        }
    }
    
    @media (max-width: 40em) {
        .task-container {
            padding: 1.6rem;
            .tasks-left {
              font-size: 1.2rem;
              line-height: 1.2rem;
              letter-spacing: -0.17px;
            }
            .main-options {
              gap: 1.2rem;
            }
            .option-btn {
              font-size: 1.2rem;
              line-height: 1.2rem;
              letter-spacing: -0.17px;
            }
        }
    }
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