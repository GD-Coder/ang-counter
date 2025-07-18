import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <div
      [class.opacity-100]="visible"
      [class.opacity-0]="!visible"
      [class.translate-x-0]="visible"
      [class.-translate-x-4]="!visible"
      class="relative group transform transition-all duration-700 ease-out"
    >
      <button
        (click)="toggleTheme()"
        aria-label="Toggle Theme"
        class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-gray-600 transition"
      >
        <ng-container *ngIf="!darkMode; else sunIcon">
          <!-- Moon icon SVG -->
          <svg
            class="text-white w-5 h-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12.79A9 9 0 0112.21 3 7 7 0 0012 21a9 9 0 009-8.21z"
            ></path>
          </svg>
        </ng-container>
        <ng-template #sunIcon>
          <!-- Sun icon SVG -->
          <svg
            class="text-yellow-500 w-5 h-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></circle>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            ></path>
          </svg>
        </ng-template>
      </button>

      <!-- Tooltip -->
      <div
        class="absolute left-full ml-2 bottom-1/2 translate-y-1/2
               px-2 py-1 text-sm bg-black text-white rounded opacity-0
               group-hover:opacity-100 transition-opacity duration-200
               whitespace-nowrap"
      >
        {{ darkMode ? 'Light Mode' : 'Dark Mode' }}
      </div>
    </div>
  `,
  imports: [CommonModule],
  // We're not using scoped styles because we're relying on global Tailwind classes.
  // This keeps Angular from complaining
  styles: [
    `
      /* Tailwind CSS classes assumed globally available */
    `,
  ],
})
export class ThemeToggleComponent implements OnInit {
  darkMode = false;
  visible = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      this.darkMode = true;
    } else {
      document.documentElement.classList.remove('dark');
      this.darkMode = false;
    }

    setTimeout(() => {
      this.visible = true;
    }, 500);
  }

  toggleTheme(): void {
    const root = document.documentElement;
    if (this.darkMode) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    this.darkMode = !this.darkMode;
  }
}
