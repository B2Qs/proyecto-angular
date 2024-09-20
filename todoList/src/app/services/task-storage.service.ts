import { Injectable, Inject, InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment'
import CryptoJS from 'crypto-js';


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
      throw new Error('No se pudo inyectar el almacenamiento');
    }
  }

  // Funciones para manejar el estado de las tareas
  getItem<T>(key: string): T | null {
    const encryptedItem = this.storage.getItem(key);
    if (!encryptedItem){
      return null;
    }
    try{
      const decryptedData = this.decryptData(encryptedItem);
      return JSON.parse(decryptedData) as T;
    }catch (error) {
      console.error('Error al descifrar los datos de localStorage', error);
      return null;
    }
  }

    // Método para cifrar y guardar un elemento en localStorage
  setItem<T>(key: string, value: T): void {
    try{
      const encryptedData = this.encryptData(JSON.stringify(value));
      this.storage.setItem(key, encryptedData)
    } catch (error) {
      console.error('Error al cifrar los datos para localStorage', error);
    }
  }

 // Eliminar un item específico
 removeItem(key: string): void {
  this.storage.removeItem(key);
}

// Limpiar todo el almacenamiento
clearStorage(): void {
  this.storage.clear();
}

// --- Métodos privados para cifrar y descifrar datos --- //

  // Cifra un string utilizando AES y la clave secreta
  private encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, this.SECRET_KEY).toString();
  }

  // Descifra un string cifrado utilizando AES y la clave secreta
  private decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

}