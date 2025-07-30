import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "app-select-box",
  imports: [CommonModule],
  template: `<div class="mb-4">
    <label class="block text-sm font-medium mb-1 text-gray-800 dark:text-white">
      {{ label }}
    </label>
    <select
      (change)="handleChange($event)"
      class="w-full px-3 py-2 rounded border border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
    >
      <option *ngFor="let opt of options">{{ opt }}</option>
    </select>
  </div> `,
})
export class SelectBoxComponent {
  @Input() label: string = "";
  @Input() options: string[] = [];
  @Output() selectionChange = new EventEmitter<string>();

  handleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectionChange.emit(select.value);
  }
}
