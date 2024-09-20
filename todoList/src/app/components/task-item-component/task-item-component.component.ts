import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task-service.service';
import { Task } from '../../interfaces/task';
import { takeUntil, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-item-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="task">

      <!-- Casilla de color -->
      <div class="task-status-indicator" 
        [ngStyle]="{'background-color': task.completed ? '#28a745' : '#dc3545'}">
      </div>

      <span>
        <input
        class="task-btn"
        aria-label="toggle"
        [ngClass]="task.completed ? 'task-btn--completed' : ''"
        (click)="updateTask()"
        type="checkbox"
      />
      </span>
      <!-- Texto de la tarea -->
       <span *ngIf="!isEditing">
        <p class="task-text" [ngClass]="task.completed ? 'task-text--completed' : ''">
          {{ task.title }}
        </p>
       </span>

       <span class="task-date">{{ task.date | date: 'dd/MM/yyyy' }}</span>

      <!-- Edition de la tarea -->
      @if (isEditing){
        <form [formGroup]="editTaskForm" class="input-wrapper" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="example-full-width">
            <mat-label>Task Name...</mat-label>
            <input
              matInput
              formControlName="title"
              class="task-input"
              type="text"
              placeholder="Edit a task..."
              required
            />
          </mat-form-field>

          <!-- date -->
          <mat-form-field appearance="outline" class="example-full-width">
          <mat-label>Task Date</mat-label>
          <input
            matInput
            [matDatepicker]="picker"
            formControlName="date"
            placeholder="DD/MM/YYYY"
          />
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

          <div class="button-container">
            <button
              type="submit"
              class="task-btn"
              style="display: flex; align-items: center; justify-content: center;"
              aria-label="save"
            >
              <img src="../../assets/images/check.svg" alt="To save a task"/>
            </button>

            <button
              type="button"
              class="task-btn_cancel"
              aria-label="cancel"
              (click)="cancelEdit()"
            >
            <img src="../../assets/images/icon-cross.svg" alt="To delete a task"/>
            </button>
          </div>
        </form>
      }

      <!-- Boton para editar la tarea -->
      <button
        mat-mini-fab
        class="task-edit-btn"
        aria-label="Edit"
        (click)="onEdit(task)"
        *ngIf="!isEditing"
        type="button">
        <mat-icon>edit</mat-icon>
      </button>

      <!-- Boton para borrar la tarea -->
      <button 
        mat-mini-fab
        class="task-delete-btn"
        aria-label="Delete" 
        (click)="deleteTask()">
        <mat-icon>delete</mat-icon>
      </button>
    </div>
  `,
  styleUrl: './task-item-component.component.scss'
})
export class TaskItemComponentComponent implements OnInit, OnDestroy {
  @Input({ required: true }) task!: Task;
  taskService = inject(TaskService);
  isEditing = false;
  editTaskForm!: FormGroup;
  
  // Sujeto para manejar las desuscripciones
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.editTaskForm = this.fb.group({
      title: new FormControl(this.task?.title || '', [Validators.required, Validators.minLength(2)]),
      completed: new FormControl(this.task?.completed || false),
      date: new FormControl(this.task?.date || null)
    });
  }

  ngOnInit(): void {
    this.editTaskForm.setValue({
      title: this.task.title,
      completed: this.task.completed,
      date: this.task.date || null
    });
  }

  // Manejar la edición de la tarea
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  onEdit(task: Task): void {
    this.isEditing = true;
    this.editTaskForm.setValue({
      title: task.title,
      completed: task.completed,
      date: task.date || null
    });
  }

  onSubmit(): void {
    if (this.editTaskForm.invalid) {
      return;
    }

    const updatedTask: Task = {
      ...this.task,
      ...this.editTaskForm.value
    };

    this.taskService.updateTask(updatedTask)
      .pipe(takeUntil(this.destroy$))
      .subscribe(success => {
        if (success) {
          this.isEditing = false;
        }
      });
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  // Método para actualizar el estado de la tarea
  updateTask(): void {
    this.taskService.updateTask({
      ...this.task,
      completed: !this.task.completed
    })
    .pipe(takeUntil(this.destroy$)) 
    .subscribe();
  }

  // Método para borrar la tarea
  deleteTask(): void {
    this.taskService.deleteTask(this.task.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  // Método para limpiar suscripciones y evitar fugas de memoria
  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete(); 
  }
}