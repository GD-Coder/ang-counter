import {
  Component,
  inject,
  OnDestroy,
  effect,
  signal,
  computed,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { ToastrService } from "ngx-toastr";

// Import child components
import { SelectBoxComponent } from "./components/selectbox";
import { ListComponent } from "./components/list";
import { ButtonPanelComponent } from "./components/button-panel";
import { ScoreCardComponent } from "./components/scorecard";
import { DowntimeCardComponent } from "./components/downtime-card";
import { ThemeToggleComponent } from "./components/theme-toggle";
import { ControlToggleComponent } from "./components/control-toggle";
import { StatusBannerComponent } from "./components/status-banner";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    SelectBoxComponent,
    ListComponent,
    ButtonPanelComponent,
    ScoreCardComponent,
    DowntimeCardComponent,
    ThemeToggleComponent,
    ControlToggleComponent,
    StatusBannerComponent,
  ],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App implements OnDestroy {
  private toastr = inject(ToastrService);
  private pollingIntervalId: ReturnType<typeof setInterval> | null = null;

  readonly title = signal("MD Counter");
  readonly sunVisible = signal(false);

  // Machines (used in selectbox)
  readonly machines = signal(["Machine 1", "Machine 2", "Machine 3"]);
  readonly selectedMachine = signal(this.machines()[0]);

  // 2D Operator array (used in list)
  readonly operators = signal<string[][]>([
    ["Johnny Walker", "Jim Beam", "Evan Williams"],
    ["Operator 1", "Operator 2", "Operator 3"],
    ["Operator 4", "Operator 5", "Operator 6"],
  ]);

  readonly selectedOperator = signal<string>(this.operators()[0][0]);

  // Other metrics
  readonly totalCount = signal(0);
  readonly percentage = signal(0);
  readonly averageRate = signal(0);
  readonly currentCount = signal(0);
  readonly totalDowntime = signal(0);
  readonly currentDowntime = signal(0);
  readonly targetRate = signal(525);
  // Threshholds
  readonly percThreshold = signal({ low: 50, mid: 75 });
  readonly avgThreshold = signal({ low: 262, mid: 393 });
  readonly countThreshold = signal({ low: 15000, mid: 34000 });

  readonly showControls = signal(
    localStorage.getItem("showControls") !== "false"
  );
  // Use the machine index to select current operators in the list
  public selectedOperatorGroup = computed(() => {
    const machineIndex = this.machines().indexOf(this.selectedMachine());
    return this.operators()[machineIndex] || [];
  });

  constructor() {
    setTimeout(() => this.sunVisible.set(true), 1000);
    // Use effect to store the state of the controls
    effect(() => {
      localStorage.setItem("showControls", this.showControls().toString());
    });
    // Use effect to keep accurate operator selection
    effect(() => {
      const group = this.selectedOperatorGroup();
      if (group.length > 0) {
        this.selectedOperator.set(group[0]);
      }
    });
  }

  // Ensure polling is stopped
  ngOnDestroy() {
    this.handleStop();
  }

  // Start gathering metrics
  public handleStart() {
    if (!this.pollingIntervalId) {
      this.startPolling();
      this.toastr.success("Metric panel started!", "Success");
    } else {
      this.toastr.info("Polling already in progress.", "Info");
    }
  }

  // Stop gathering metrics
  public handleStop() {
    if (this.pollingIntervalId) {
      clearInterval(this.pollingIntervalId);
      this.pollingIntervalId = null;
      this.toastr.success("Metric panel stopped!", "Success");
    }
  }

  // Fetch metrics from API
  private async startPolling() {
    await this.updateMetrics();
    this.pollingIntervalId = setInterval(() => this.updateMetrics(), 5000);
  }

  // Toggle controls
  public toggleControls() {
    this.showControls.set(!this.showControls());
  }

  public operatorDisplay = (op: string) => op;

  // Update the machine
  public selectMachine(machine: string) {
    this.selectedMachine.set(machine);
  }

  // Update selected operators
  public selectOperator(op: string) {
    this.selectedOperator.set(op);
  }

  // Centralize polling call
  private async fetchJSON(url: string) {
    const res = await fetch(url);
    return res.json();
  }
  // Update scorecard metrics
  private async updateMetrics() {
    try {
      const [average, current, total, totalDT, currentDT] = await Promise.all([
        this.fetchJSON("http://127.0.0.1:3200/average-count"),
        this.fetchJSON("http://127.0.0.1:3200/current-count"),
        this.fetchJSON("http://127.0.0.1:3200/total-count"),
        this.fetchJSON("http://127.0.0.1:3200/total-downtime"),
        this.fetchJSON("http://127.0.0.1:3200/current-downtime"),
      ]);

      this.averageRate.set(average.count);
      this.currentCount.set(current.count);
      this.totalCount.set(total.count);
      this.totalDowntime.set(totalDT.count);
      this.currentDowntime.set(currentDT.count);

      const percent = (average.count * 100) / this.targetRate();
      this.percentage.set(percent);
    } catch (err) {
      this.toastr.error(`Polling error: ${err}`, "Error");
    }
  }
}
