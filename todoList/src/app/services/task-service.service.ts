import { computed, inject, Injectable, signal } from '@angular/core';
import { Task } from '../interfaces/task';
import { TaskOption } from '../interfaces/estado-task';
import { TaskStorageService } from './task-storage.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { Observable, BehaviorSubject, from, mergeMap, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private readonly taskStorageKey = 'tasks';
  private taskSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  public tasks$: Observable<Task[]> = this.taskSubject.asObservable().pipe(
    distinctUntilChanged()
  );

  constructor(private taskStorage: TaskStorageService) {}

  tasks = signal<Task[]>([]);
  optionSelect = signal<TaskOption>('all');

  // Metodo que permite filtrar las tareas 
  filtrarTasks = computed(() =>{
    switch(this.optionSelect()){
      case 'all':
        return this.tasks();
      case 'active':
        return this.tasks().filter((task) => !task.completed);
      case 'completed':
        return this.tasks().filter((task) => task.completed);
    }
  })

  taskSleft = computed(
    () => this.tasks().filter((task) => !task.completed).length
  )

    // Load todos from local storage
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
  private guardarTasks(tasks: Task[]): void{
    try {
      this.taskStorage.setItem<Task[]>(this.taskStorageKey, tasks)
    } catch (error) {
      console.error('Failed to save todos to localStorage', error);
    }
  }

  // Obtener todas las tareas //
  getTasks(): Observable<Task[]>{
    const tasks = this.loadTasks();  
    console.log('Tasks cargadas de localStorage:', tasks); 
    this.taskSubject.next(tasks);
    this.tasks.set(tasks);
    return this.tasks$;
  }

  // metodo creacion de tarea
  addTask(task: Task): Observable<boolean>{
    if (!task || !task.title.trim()){
      return of(false)
    }
    const tasksRecientes = this.taskSubject.getValue();
    const newTasks = [...tasksRecientes, task];
    this.taskSubject.next(newTasks);
    this.guardarTasks(newTasks)
    return of(true);
  }

  // update task
  updateTask(taskupdate: Task): Observable<boolean>{
    if (!taskupdate || !taskupdate.id){
      return of(false)
    }

    const taskRecientes = this.taskSubject.getValue();
    const updatedTaks = taskRecientes.map(task => task.id ===
      taskupdate.id ? taskupdate : task
    );
    this.taskSubject.next(updatedTaks);
    this.guardarTasks(updatedTaks)
    return of(true);
  }

  //Borrar task
   deleteTask(id: number): Observable<boolean> {
    if (id == null) {
      return of(false);
    }

    const TasksRecientes = this.taskSubject.getValue();
    const updatedTasks = TasksRecientes.filter(task => task.id !== id);
    this.taskSubject.next(updatedTasks)
    this.guardarTasks
    return of(true);
  }

  // METODO DE SELECCION DE OPCION
  selecTaskOption(taskOption: TaskOption){
    if(this.optionSelect() === taskOption) return;
    this.optionSelect.set(taskOption)
  }

  clearCompletedTask(){
    return from(this.tasks().filter((task) => task.completed)).pipe(
      mergeMap((task) => this.deleteTask(task.id!)),
      tap(() => 
      this.tasks.update((tasks) => tasks.filter((task)=>!task.completed)))
    )
  }

}
