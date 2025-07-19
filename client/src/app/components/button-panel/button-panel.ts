import { NgIcon, provideIcons } from "@ng-icons/core";
import { Component, EventEmitter, Output } from "@angular/core";
import { heroPlaySolid, heroStopSolid } from "@ng-icons/heroicons/solid";

@Component({
  standalone: true,
  viewProviders: [provideIcons({ heroPlaySolid, heroStopSolid })],
  imports: [NgIcon],
  selector: "app-button-panel",
  template: `
    <div class="bottom-9 flex justify-center">
      <div class="flex space-x-4">
        <button
          (click)="onStart.emit()"
          class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow"
          aria-label="Start"
        >
          <ng-icon class="text-white" name="heroPlaySolid" />
          Start
        </button>

        <button
          (click)="onStop.emit()"
          class="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow"
          aria-label="Stop"
        >
          <ng-icon class="text-white" name="heroStopSolid" />
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
