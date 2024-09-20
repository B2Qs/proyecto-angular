import { computed, Injectable, signal } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Task } from '../interfaces/task';
import { TaskOption } from '../interfaces/estado-task';
import { TaskStorageService } from './task-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService{
  private readonly taskStorageKey = 'tasks';
  private taskSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.taskSubject.asObservable().pipe(distinctUntilChanged());

 
  tasks = signal<Task[]>([]);
  optionSelect = signal<TaskOption>('all');

  filteredTasks = computed(() => {
    const currentTasks = this.tasks();
    switch (this.optionSelect()) {
      case 'active':
        return currentTasks.filter(task => !task.completed);
      case 'completed':
        return currentTasks.filter(task => task.completed);
      default:
        return currentTasks;
    }
  });

  // Permite de tener una idea de cuanto tasks has terminado
  tasksLeft = computed(() => this.tasks().filter(task => !task.completed).length);

  constructor(private taskStorage: TaskStorageService) {
    this.loadTasks();
  }

    // Load todos los tasks from local storage
    private loadTasks(): Task[] {
      try {
        return this.taskStorage
        .getItem<Task[]>(this.taskStorageKey) || [];
      } catch (error) {
        console.error('Failed to load todos from localStorage', error);
        return [];
      }
    }

  // Guardar tasks to localStorage
  private saveTasks(tasks: Task[]): void{
    try {
      this.taskStorage.setItem<Task[]>(this.taskStorageKey, tasks)
    } catch (error) {
      console.error('Failed to save todos to localStorage', error);
    }
  }

  // Obtener todas las tareas //
  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Task): Observable<boolean> {
    if (!task || !task.title.trim()) {
      return new Observable(observer => observer.next(false));
    }
    const updatedTasks = [...this.taskSubject.getValue(), task];
    this.updateTasks(updatedTasks);
    return new Observable(observer => observer.next(true));
  }

  updateTask(taskToUpdate: Task): Observable<boolean> {
    if (!taskToUpdate || !taskToUpdate.id) {
      return of(false)
    }
    const updatedTasks = this.taskSubject.getValue().map(task => 
      task.id === taskToUpdate.id ? taskToUpdate : task
    );
    this.updateTasks(updatedTasks);
    return of(true)
  }

  deleteTask(id: number): Observable<boolean> {
    if (id == null) {
      return of(false);
    }
    const updatedTasks = this.taskSubject.getValue().filter(task => task.id !== id);
    this.updateTasks(updatedTasks);
    return of(true);
  }

  selectTaskOption(taskOption: TaskOption): void {
    if (this.optionSelect() !== taskOption) {
      this.optionSelect.set(taskOption);
    }
  }

  clearCompletedTasks(): Observable<boolean> {
    const tasksToDelete = this.tasks().filter(task => task.completed);
    const updatedTasks = this.tasks().filter(task => !task.completed);
    this.updateTasks(updatedTasks);
    return new Observable(observer => {
      tasksToDelete.forEach(task => this.deleteTask(task.id!).subscribe());
      observer.next(true);
    });
  }

  private updateTasks(tasks: Task[]): void {
    this.taskSubject.next(tasks);
    this.tasks.set(tasks);
    this.saveTasks(tasks);
  }
}