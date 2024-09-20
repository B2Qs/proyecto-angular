import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task-service.service';
import { Task } from '../interfaces/task';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    completed: false,
    date: new Date(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks (getTasks)', () => {
    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual([mockTask]);
    });

    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.method).toBe('GET');
    req.flush([mockTask]);
  });

  it('should update task (updateTask)', () => {
    service.updateTask(mockTask).subscribe(success => {
      expect(success).toBeTrue(); 
    });

    const updatedTasks = service['taskSubject'].getValue();
    expect(updatedTasks.some(task => task.id === mockTask.id)).toBeTrue();
  });

  it('should delete task (deleteTask)', () => {
    service.deleteTask(mockTask.id).subscribe(success => {
      expect(success).toBe(true);
    });

    const updatedTasks = service['taskSubject'].getValue();
  expect(updatedTasks.some(task => task.id === mockTask.id)).toBeFalse();
  });
});
