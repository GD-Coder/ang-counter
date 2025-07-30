import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-list',
  imports: [CommonModule],
  template: `<div>
    <h2 class="text-md font-semibold mb-2 text-gray-800 dark:text-white">
      {{ title }}
    </h2>
    <div class="flex-1 overflow-y-auto max-h-96">
      <ul
        class="border border-gray-300 dark:border-gray-700 rounded divide-y divide-gray-200 dark:divide-gray-700"
      >
        <li
          *ngFor="let item of items"
          (click)="onClick(item)"
          class="px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-blue-200 hover:bg-gray-200 transition-colors"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div> `,
})
export class ListComponent {
  @Input() title: string = '';
  @Input() items: string[] = [];
  @Output() itemClick = new EventEmitter<string>();

  onClick(item: string) {
    this.itemClick.emit(item);
  }
}
