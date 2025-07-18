import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'control-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="group fixed bottom-0 left-0 z-50 m-2 transform transition-all duration-700 ease-out"
      [ngClass]="{
        'opacity-100 translate-x-0': visible,
        'opacity-0 -translate-x-4': !visible
      }"
    >
      <button
        (click)="toggleControls()"
        [attr.aria-label]="showControls ? 'Hide Controls' : 'Show Controls'"
        class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-gray-600 transition"
      >
        <ng-container [ngSwitch]="iconDirection">
          <svg
            *ngSwitchCase="'left'"
            class="h-6 w-6 text-white dark:text-blue-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M15.5 19.5L9 12l6.5-7.5z" />
          </svg>
          <svg
            *ngSwitchCase="'right'"
            class="h-6 w-6 text-white dark:text-blue-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8.5 4.5L15 12l-6.5 7.5z" />
          </svg>
          <svg
            *ngSwitchCase="'up'"
            class="h-6 w-6 text-white dark:text-blue-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.5 15.5L12 9l7.5 6.5z" />
          </svg>
          <svg
            *ngSwitchCase="'down'"
            class="h-6 w-6 text-white dark:text-blue-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.5 8.5L12 15l7.5-6.5z" />
          </svg>
        </ng-container>
      </button>

      <div
        class="absolute left-full ml-2 bottom-1/2 translate-y-1/2
               px-2 py-1 text-sm bg-black text-white rounded opacity-0
               group-hover:opacity-100 transition-opacity duration-200
               whitespace-nowrap"
      >
        {{ showControls ? 'Hide Controls' : 'Show Controls' }}
      </div>
    </div>
  `,
})
export class ControlToggleComponent implements OnInit {
  @Input() showControls: boolean = true;
  @Output() showControlsChange = new EventEmitter<boolean>();

  visible = false;
  isMobile = false;

  ngOnInit(): void {
    const saved = localStorage.getItem('showControls');
    if (saved !== null) {
      this.showControlsChange.emit(saved === 'true');
    }

    this.checkScreenSize();
    setTimeout(() => (this.visible = true), 500);
  }

  @HostListener('window:resize')
  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
  }

  toggleControls(): void {
    this.showControls = !this.showControls;
    this.showControlsChange.emit(this.showControls);
    localStorage.setItem('showControls', String(this.showControls));
  }

  get iconDirection(): 'left' | 'right' | 'up' | 'down' {
    if (this.showControls) return this.isMobile ? 'up' : 'left';
    return this.isMobile ? 'down' : 'right';
  }
}
