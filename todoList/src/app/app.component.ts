import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AllTaskComponent } from './components/all-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    AllTaskComponent,
  ],
  template: `
    <main class="main">
      <app-all-task/>
    </main>
    `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todoList';
}
