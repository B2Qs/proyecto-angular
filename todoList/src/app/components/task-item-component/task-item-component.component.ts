import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskServiceService } from '../../services/task-service.service';
import { Task } from '../../interfaces/task';
import { take } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
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
            <img src="/check.svg" alt="To save a task"/>
          </button>

            <button
              type="button"
              class="task-btn_cancel"
              aria-label="cancel"
              (click)="cancelEdit()"
              
            >
            <img src="/icon-cross.svg" alt="To delete a task"/>
          </button>
          </div>
        </form>
      }

      <!-- Boton para editar la tarea -->
      <button
        class="task-edit-btn"
        aria-label="Edit"
        (click)="onEdit(task)"
        *ngIf="!isEditing"
        type="button">
        <img src="/edit-button.svg" alt="To edit a task"/>
      </button>

      <!-- Boton para borrar la tarea -->
      <button 
        class="task-delete-btn"
        aria-label="Delete" 
        (click)="deleteTask()">
      <img src="/icon-cross.svg" alt="To delete a task"/>
      </button>
    </div>
  `,
  styleUrl: './task-item-component.component.scss'
})
export class TaskItemComponentComponent {

  @Input({ required: true }) task!: Task;
  taskService = inject(TaskServiceService);
  isEditing = false;
  editTaskForm!: FormGroup;

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
    console.log(' editTaskForm ',this.editTaskForm.value);
  }

  togglEdit(){
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

  // Soumit del formulario de edicion
  onSubmit(): void {
    if (this.editTaskForm.invalid) {
      return;
    }


    // Construire l'objet de la tâche mise à jour
    const updatedTask: Task = {
      ...this.task, // Garder l'ID et les autres propriétés
      ...this.editTaskForm.value // Appliquer les nouvelles valeurs du formulaire
    };

    // Envoyer la tâche mise à jour au service
    this.taskService.updateTask(updatedTask).subscribe(success => {
      if (success) {
        this.isEditing = false; // Quitter le mode édition après la sauvegarde
      }
    });
  }

  // Annuler le mode édition
  cancelEdit(): void {
    this.isEditing = false;
  }

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
    this.taskService.deleteTask(this.task.id).pipe(take(1)).subscribe();
  }

}
