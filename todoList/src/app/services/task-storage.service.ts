import { Injectable, Inject, InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment'
import * as CryptoJS from 'crypto-js';


export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

@Injectable({
  providedIn: 'root',
})
export class TaskStorageService {

  private readonly SECRET_KEY = environment.secretKey;

  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {
    if (!storage) {
      throw new Error('Storage injection failed');
    }
  }

  // Funciones para manejar el estado de las tareas
  getItem<T>(key: string): T | null {
    const encryptedItem = this.storage.getItem(key);
    if (encryptedItem){
      try{
        const bytes = CryptoJS.AES.decrypt(encryptedItem, this.SECRET_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData) as T;
      }catch (error) {
        console.error('Error al descifrar los datos de localStorage', error);
        return null;  // O bien puedes manejar este error de alguna otra manera
      }
    }
    return null
  }

  setItem<T>(key: string, value: T): void {
    try{
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), this.SECRET_KEY).toString();
      this.storage.setItem(key, encryptedData)
    } catch (error) {
      console.error('Error al cifrar los datos para localStorage', error);
    }
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}