import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { heroSun, heroMoon } from "@ng-icons/heroicons/outline";

@Component({
  selector: "app-theme-toggle",
  standalone: true,
  viewProviders: [provideIcons({ heroSun, heroMoon })],
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
          <ng-icon class="text-white" name="heroMoon" />
        </ng-container>
        <ng-template #sunIcon>
          <ng-icon class="text-white dark:text-yellow-500" name="heroSun" />
        </ng-template>
      </button>

      <!-- Tooltip -->
      <div
        class="absolute left-full ml-2 bottom-1/2 translate-y-1/2
               px-2 py-1 text-sm bg-black text-white rounded opacity-0
               group-hover:opacity-100 transition-opacity duration-200
               whitespace-nowrap"
      >
        {{ darkMode ? "Light Mode" : "Dark Mode" }}
      </div>
    </div>
  `,
  imports: [NgIcon, CommonModule],
  // We're not using scoped styles because we're relying on global Tailwind classes.
  // This keeps Angular from complaining
  styles: [],
})
export class ThemeToggleComponent implements OnInit {
  darkMode = false;
  visible = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      this.darkMode = true;
    } else {
      document.documentElement.classList.remove("dark");
      this.darkMode = false;
    }

    setTimeout(() => {
      this.visible = true;
    }, 500);
  }

  toggleTheme(): void {
    const root = document.documentElement;
    if (this.darkMode) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    this.darkMode = !this.darkMode;
  }
}
