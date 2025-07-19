import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { heroEyeSolid, heroEyeSlashSolid } from "@ng-icons/heroicons/solid";

@Component({
  selector: "control-toggle",
  standalone: true,
  imports: [CommonModule, NgIcon],
  viewProviders: [provideIcons({ heroEyeSolid, heroEyeSlashSolid })],
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
        <ng-container *ngIf="!showControls; else openIcon">
          <ng-icon class="text-white" name="heroEyeSolid" />
        </ng-container>
        <ng-template #openIcon>
          <ng-icon class="text-white" name="heroEyeSlashSolid" />
        </ng-template>
      </button>

      <div
        class="absolute left-full ml-2 bottom-1/2 translate-y-1/2
               px-2 py-1 text-sm bg-black text-white rounded opacity-0
               group-hover:opacity-100 transition-opacity duration-200
               whitespace-nowrap"
      >
        {{ showControls ? "Hide Controls" : "Show Controls" }}
      </div>
    </div>
  `,
})
export class ControlToggleComponent implements OnInit {
  @Input() showControls: boolean = true;
  @Output() showControlsChange = new EventEmitter<boolean>();

  visible = false;
  isMobile = false;
  /* Initialize logic, fetch data, or set up state when the component is ready */
  ngOnInit(): void {
    const saved = localStorage.getItem("showControls");
    if (saved !== null) {
      this.showControlsChange.emit(saved === "true");
    }

    this.checkScreenSize();
    setTimeout(() => (this.visible = true), 500);
  }

  @HostListener("window:resize")
  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
  }

  toggleControls(): void {
    this.showControls = !this.showControls;
    this.showControlsChange.emit(this.showControls);
    localStorage.setItem("showControls", String(this.showControls));
  }

  get iconDirection(): "left" | "right" | "up" | "down" {
    if (this.showControls) return this.isMobile ? "up" : "left";
    return this.isMobile ? "down" : "right";
  }
}
