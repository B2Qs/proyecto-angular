import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskServiceService } from '../../services/task-service.service';
import { Task } from '../../interfaces/task';
import { take } from 'rxjs';

@Component({
  selector: 'app-task-item-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="task">
      <button 
        class="task-btn"
        aria-label="Mark as completed"
        [ngClass]="task.completed ? 'task-btn--completed' : ''"
        (click)="updateTask()">
      ></button>
      <p class ="task-text" [ngClass]="task.completed ? 'task-text--completed' : ''">
        {{ task.title }}
      </p>
      <button class="task-btn task-btn--danger" 
      aria-label="Delete" (click)="deleteTask()">
      <img
          src="../../../assets/images/icon-cross.svg"
          alt="Cross icon image to delete a todo"
        />
    </button>
      
    </div>
  `,
  styleUrl: './task-item-component.component.scss'
})
export class TaskItemComponentComponent {

  @Input({ required: true }) task!: Task;
  taskService = inject(TaskServiceService);

  // METODO DE ACTUALIZAR TAREA
  updateTask(){
    this.taskService.
    updateTask({
      ...this.task,
      completed: !this.task.completed})
    .pipe(take(1))
    .subscribe();
  }

  // METODO DE BORRAR TAREA
  deleteTask(){
    this.taskService
    .deleteTask(this.task.id)
    .pipe(take(1))
    .subscribe();
  }

}
