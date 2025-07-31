import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { CountUpModule } from "ngx-countup";

type Threshold = {
  low: number;
  mid: number;
};

@Component({
  selector: "app-score-card",
  standalone: true,
  imports: [CountUpModule, CommonModule],
  /* Using templates inline instead of in seperate HTML files */
  template: `
    <div
      class="w-full h-full rounded overflow-hidden shadow-lg animate-fadeIn flex flex-col md:flex-row"
    >
      <!-- Left column -->
      <div class="w-full md:w-1/2 flex flex-col">
        <!-- Top left box -->
        <div
          [ngClass]="getColorClass(averageRate, avgThreshold)"
          class="dark:bg-black bg-gray-100  border dark:border-gray-700 border-gray-300 text-center py-6 md:py-4 px-4 flex flex-col justify-center flex-1"
        >
          <div class="text-base md:text-lg font-bold uppercase tracking-wide">
            {{ averageLabel }}
          </div>
          <div class="text-7xl md:text-8xl lg:text-8xl font-extrabold">
            <h1 [countUp]="averageRate" [options]="{ duration: 1.5 }"></h1>
          </div>
        </div>

        <!-- Bottom left box -->
        <div
          class="text-gray-600 dark:text-blue-200 dark:bg-black bg-gray-100 border dark:border-gray-700 border-gray-300 text-center py-6 md:py-4 px-4 flex flex-col justify-center flex-1"
        >
          <div class="text-base md:text-lg font-bold uppercase tracking-wide">
            {{ targetLabel }}
          </div>
          <div class="text-7xl md:text-8xl lg:text-8xl font-extrabold">
            <h1 [countUp]="targetRate" [options]="{ duration: 1.5 }"></h1>
          </div>
        </div>
      </div>

      <!-- Right column -->
      <div class="w-full md:w-1/2 flex flex-col">
        <!-- Top right box -->
        <div
          [ngClass]="getColorClass(currentCount, countThreshold)"
          class="bg-gray-100 text-center py-6 md:py-4 px-4 flex flex-col justify-center flex-1 border dark:border-gray-700 border-gray-300 dark:bg-black"
        >
          <div class="text-base md:text-lg font-bold uppercase tracking-wide">
            {{ currentLabel }}
          </div>
          <div class="text-7xl md:text-8xl lg:text-8xl font-extrabold">
            <h1 [countUp]="currentCount" [options]="{ duration: 1.5 }"></h1>
          </div>
        </div>

        <!-- Bottom right box -->
        <div
          [ngClass]="getColorClass(percentage, percThreshold)"
          class="bg-gray-100 text-center py-6 md:py-4 px-4 flex flex-col justify-center flex-1 border dark:border-gray-700 border-gray-300 dark:bg-black"
        >
          <div class="text-base md:text-lg font-bold uppercase tracking-wide">
            {{ percentageLabel }}
          </div>
          <div class="text-7xl md:text-8xl lg:text-8xl font-extrabold">
            <h1
              [countUp]="percentage"
              [options]="{ duration: 1.5, suffix: '%', decimalPlaces: 2 }"
            ></h1>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ScoreCardComponent {
  @Input() averageRate!: number;
  @Input() targetRate!: number;
  @Input() averageLabel!: string;
  @Input() targetLabel!: string;
  @Input() currentCount!: number;
  @Input() percentage!: number;
  @Input() currentLabel!: string;
  @Input() percentageLabel!: string;
  @Input() avgThreshold!: Threshold;
  @Input() countThreshold!: Threshold;
  @Input() percThreshold!: Threshold;

  getColorClass(score: number, threshold: Threshold): string {
    if (!threshold) return "text-white";
    if (score <= threshold.low) return "text-red-600 dark:text-red-500";
    if (score <= threshold.mid) return "text-yellow-600 dark:text-yellow-400";
    return "text-green-600";
  }
}
