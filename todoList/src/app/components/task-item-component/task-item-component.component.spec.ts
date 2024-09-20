import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponentComponent } from './task-item-component.component';
import { TaskService } from '../../services/task-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Task } from '../../interfaces/task';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

describe('TaskItemComponentComponent', () => {
  let component: TaskItemComponentComponent;
  let fixture: ComponentFixture<TaskItemComponentComponent>;
  let taskServiceMock: any;

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    completed: false,
    date: new Date(),
  };

  beforeEach(async () => {
    taskServiceMock = jasmine.createSpyObj('TaskService', ['updateTask', 'deleteTask']);
    taskServiceMock.updateTask.and.returnValue(of(true));
    taskServiceMock.deleteTask.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, 
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      declarations: [TaskItemComponentComponent],
      providers: [{ provide: TaskService, useValue: taskServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemComponentComponent);
    component = fixture.componentInstance;
    component.task = mockTask;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with task data', () => {
    expect(component.editTaskForm.value).toEqual({
      title: mockTask.title,
      completed: mockTask.completed,
      date: mockTask.date,
    });
  });

  it('should toggle edit mode when onEdit is called', () => {
    component.onEdit(mockTask);
    expect(component.isEditing).toBeTrue();
  });

  it('should call updateTask method when updateTask is triggered', () => {
    component.updateTask();
    expect(taskServiceMock.updateTask).toHaveBeenCalledWith({
      ...mockTask,
      completed: !mockTask.completed,
    });
  });

  it('should call deleteTask method when deleteTask is triggered', () => {
    component.deleteTask();
    expect(taskServiceMock.deleteTask).toHaveBeenCalledWith(mockTask.id);
  });

  it('should submit form and update task when onSubmit is called', () => {
    component.onSubmit();
    expect(taskServiceMock.updateTask).toHaveBeenCalled();
    expect(component.isEditing).toBeFalse();
  });
});
