import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskDarkThemeComponent } from "./task-darkTheme.component";


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, TaskDarkThemeComponent],
    template: `
    <header class="header">
        <h1 class="header-title">Taskbox</h1>
        <app-task-darkTheme/>
    </header>
    `,
    styles: [`
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 1rem;
            margin-bottom: 4rem;
            border-bottom: 1px solid #ccc;
            background-color: var(--primary-color);
            color: var(--on-primary-color);
        }

        .header-title {
      color: var(--text-color-100);
      font-size: 4rem;
      font-weight: 700;
      line-height: 4rem;
      letter-spacing: 1.5rem;
    }

    @media (max-width: 40em) {
      .header-title {
        font-size: 2.5rem;
        line-height: 2rem;
        letter-spacing: 1.3rem;
      }
    }
    `],
})
export class HeaderComponent {}