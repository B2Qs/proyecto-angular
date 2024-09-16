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
      @for (task of tasks; track $index) {
      <li>
        <app-task-item-component [task]="task"/>
      </li>
      }@empty {
        <li>
        <p class="no-tasks">No tasks</p>
      </li>
      }
    </ul>
</section>
  `,
  styleUrl: './task-list-component.component.scss'
})
export class TaskListComponentComponent {
  @Input ({ required: true }) tasks!: Task[];
}
