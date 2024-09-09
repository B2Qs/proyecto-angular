import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponentComponent } from '../task-item-component/task-item-component.component';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task-list-component',
  standalone: true,
  imports: [CommonModule, TaskItemComponentComponent],
  template: `
  <section class="task-list">
    <ul class="task-list__list">
      <!-- Utilisation de *ngFor pour itérer sur les tâches -->
      <li *ngFor="let task of tasks; trackBy: trackByTaskId">
        <app-task-item-component [task]="task"></app-task-item-component>
      </li>

      <!-- Utilisation de *ngIf pour afficher un message si la liste est vide -->
      <li *ngIf="tasks.length === 0">
        <p class="no-tasks">No tasks</p>
      </li>
    </ul>
</section>

  `,
  styleUrl: './task-list-component.component.scss'
})
export class TaskListComponentComponent {
  @Input ({ required: true }) tasks!: Task[];

  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }
}
