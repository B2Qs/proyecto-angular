import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task-service.service';
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
        @for(option of taskOptions; track option) {
          <li>
            <button
              class="option-btn option-btn--primary"
              [ngClass]="{ active: option === selectedTaskOption }"
              (click)="onSelect(option)"
            >
              {{ option | titlecase }}
            </button>
          </li>
        }
      </ul>
      <button class="option-btn option-btn--secondary" (click)="onClearCompleted()">
        Clear completed
      </button>
    </div>
  `,
  styles: [`
    .task-container {
      padding: 1.6rem 2.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .tasks-left {
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
    }
    .main-options li {
      height: 1.4rem;
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
    @media (max-width: 40em) {
      .task-container {
        padding: 1.6rem;
      }
      .tasks-left, .option-btn {
        font-size: 1.2rem;
        line-height: 1.2rem;
        letter-spacing: -0.17px;
      }
      .main-options {
        gap: 1.2rem;
      }
    }
  `]
})
export class TaskOptionsComponent {
  @Input({ required: true }) tasksLeft = 0;
  
  private taskService = inject(TaskService);

  taskOptions: TaskOption[] = ['all', 'active', 'completed'];

  get selectedTaskOption(): TaskOption {
    return this.taskService.optionSelect();
  }

  onSelect(option: TaskOption): void {
    this.taskService.selectTaskOption(option);
  }

  onClearCompleted(): void {
    this.taskService.clearCompletedTasks().pipe(take(1)).subscribe();
  }
}