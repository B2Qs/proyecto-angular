import { Inject, Injectable } from '@angular/core';
import { TaskStorageService, BROWSER_STORAGE } from './task-storage.service';

@Injectable()
export class BrowserStorageService extends TaskStorageService {
  constructor(@Inject(BROWSER_STORAGE) public override storage: Storage) {
    super(storage)
  }
}
