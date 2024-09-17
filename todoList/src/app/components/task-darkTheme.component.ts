import { Component, effect, signal } from "@angular/core";
import { CommonModule } from "@angular/common";


@Component({
    selector: 'app-task-darkTheme',
    standalone: true,
    imports: [CommonModule],
    template: `
    <button class="header-btn" (click)="toggleTheme()">
        <img
        [src]="'../../assets/images/icon-' +
          (theme() === 'light-mode' ? 'moon' : 'sun') +
          '.svg'
          "
          alt="dark theme icon"
        />
    </button>
    `,
    styles: [`
        .header-btn {
            border: none;
            outline: none;
            border-radius: 50%;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: transparent;
            color: var(--shadow-color);
            cursor: pointer;
            width: 3.6rem;
            height: 3.6rem;
            transition: all 0.3s;
            &:hover,
            &:focus{
                outline: none; 
                box-shadow: 0 0 0.2rem 0.15rem var(--shadow-color);
                scale: 1.1;
            }

            img {
                display: block;
            }

            @media (max-width: 40em) {
                .header-btn {
                    width: 2.4rem;
                    height: 2.4rem;
                }
            }
        }
        `],
})
export class TaskDarkThemeComponent {
    theme = signal<Theme>(
        (localStorage.getItem('theme') as Theme) || 
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark-mode' : 'light-mode'
    );

    constructor() {
        effect(() => {
            if(this.theme() === 'light-mode') {
                document.documentElement.classList.add('light-mode');
                document.documentElement.classList.remove('dark-mode');
            }

            if(this.theme() === 'dark-mode') {
                document.documentElement.classList.add('dark-mode');
                document.documentElement.classList.remove('light-mode');
            }

            localStorage.setItem('theme', this.theme());
        })
    }

    toggleTheme() {
        this.theme.update((theme) =>
            theme === 'dark-mode' ? 'light-mode' : 'dark-mode'
        );
    }

}

type Theme = 'light-mode' | 'dark-mode'