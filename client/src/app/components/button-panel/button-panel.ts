import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-button-panel',
  template: `
    <div class="bottom-9 flex justify-center">
      <div class="flex space-x-4">
        <button
          (click)="onStart.emit()"
          class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow"
          aria-label="Start"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.752 11.168l-6.518-3.752A1 1 0 007 8.284v7.432a1 1 0 001.234.97l6.518-1.941a1 1 0 00.5-1.642l-3.5-3.835z"
            />
          </svg>
          Start
        </button>

        <button
          (click)="onStop.emit()"
          class="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow"
          aria-label="Stop"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect
              width="12"
              height="12"
              x="6"
              y="6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Stop
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class ButtonPanelComponent {
  @Output() onStart = new EventEmitter<void>();
  @Output() onStop = new EventEmitter<void>();
}
