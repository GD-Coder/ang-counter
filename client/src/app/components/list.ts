import { CommonModule } from "@angular/common";
import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "app-list",
  imports: [CommonModule],
  template: `
    <div>
      <h2 class="text-md font-semibold mb-2 text-gray-800 dark:text-white">
        {{ title }}
      </h2>
      <div class="flex-1 overflow-y-auto h-96">
        <ul
          class="border border-gray-300 dark:border-gray-700 rounded divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li
            *ngFor="let item of items; trackBy: trackByFn"
            (click)="setDisplayOperator(item)"
            class="px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-colors"
          >
            {{ display(item) }}
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class ListComponent<T = string> {
  @Input() title = "";
  @Input() items: readonly T[] = [];
  @Input() displayFn: (item: T) => string = (item) => String(item);

  @Output() itemClick = new EventEmitter<T>();

  setDisplayOperator(item: T): void {
    this.itemClick.emit(item);
  }

  trackByFn = (_index: number, item: T): any => item;
  display(item: T): string {
    return this.displayFn(item);
  }
}
