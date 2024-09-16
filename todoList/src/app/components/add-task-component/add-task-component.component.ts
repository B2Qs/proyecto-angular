import { Component, inject, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskServiceService } from '../../services/task-service.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-add-task-component',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatInputModule, 
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-task-component.component.html',
  styleUrl: './add-task-component.component.scss'
})
export class AddTaskComponentComponent {

  fb = inject(FormBuilder);
  constructor(private taskService: TaskServiceService){}
  taskAdded: boolean = false;
  newDateTaks: Date | null = null;
  
  protected readonly value = signal('');

  // metodo de validacion
  newTaskForm = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(2)]],
    completed: [false],
    date: [null],
  });

  // metodo de submit
  onSubmit = () => {

    const { text, completed } = this.newTaskForm.value;
    const task: Task = {
      id: Math.random(),
      title: text ?? 'No title',
      completed: completed ?? false,
      message: '',
      date: this.newDateTaks
    };
    
    this.taskService.addTask(task).subscribe(success => {
      if (success){
        console.log("task added!!");
      }else{
        console.error(' Error al agregar tasks !')
      }
    })

    // Mensaje Opcional
    if(this.value){
      task.message = this.value();
    }

    this.newTaskForm.reset({
      text: '',
      completed: false,
      date: null,
    });
    this.taskAdded = true;

    // Ocultar la confirmación después de 3 segundos
    setTimeout(() => (this.taskAdded = false), 3000);
  };

  protected onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }
}