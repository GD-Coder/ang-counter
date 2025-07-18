import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-banner',
  standalone: true,
  template: `
    <div
      class="w-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-blue-200 p-3 rounded shadow text-center transition-all duration-300 transform animate-fade-in-slide"
    >
      <p
        class="text-sm md:text-base font-medium uppercase flex flex-col md:flex-row items-center justify-center gap-1"
      >
        <span class="flex items-center gap-1">
          <!-- User icon SVG -->
          <svg
            class="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
          &nbsp;&nbsp;
          <span class="font-semibold">{{ operator }}</span>
        </span>

        <span class="hidden md:inline">&nbsp;&nbsp;</span>

        <span class="flex items-center gap-1">
          <!-- Sliders icon SVG -->
          <svg
            class="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M3 17h6v-2H3v2zm0-6h12v-2H3v2zm0-6v2h18V5H3zm14 8h4v-2h-4v2z"
            />
          </svg>
          &nbsp;&nbsp;
          <span class="font-semibold">{{ machine || 'None Selected' }}</span>
        </span>
      </p>
    </div>
  `,
  styles: [
    `
      /* Added to prevent Angular from complaining */
    `,
  ],
})
export class StatusBannerComponent {
  @Input() operator: string = '';
  @Input() machine: string | null = null;
}
