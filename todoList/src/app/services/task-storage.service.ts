import { Injectable, Inject, InjectionToken } from '@angular/core';


export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

@Injectable({
  providedIn: 'root',
})
export class TaskStorageService {

  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {
    if (!storage) {
      throw new Error('Storage injection failed');
    }
  }

  // Funciones para manejar el estado de las tareas
  getItem<T>(key: string): T | null {
    const item = this.storage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}