import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type Threshold = {
  low: number;
  mid: number;
};

@Component({
  selector: 'downtime-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="w-full h-full border border-gray-700 dark:border-gray-500 rounded overflow-hidden shadow-lg animate-fadeIn flex bg-white dark:bg-gray-800"
    >
      <!-- Current Downtime -->
      <div
        class="w-1/2 p-6 text-center border-r border-gray-700 dark:border-gray-500"
      >
        <div
          class="text-xs sm:text-sm md:text-lg font-bold uppercase dark:text-blue-200 text-gray-600"
        >
          Current Downtime
        </div>
        <div
          [ngClass]="getColorClass(currentDowntime, currentThreshold)"
          class="text-2xl sm:text-3xl md:text-5xl font-extrabold"
        >
          {{ formatDuration(currentDowntime) }}
        </div>
      </div>

      <!-- Total Downtime -->
      <div class="w-1/2 p-6 text-center">
        <div
          class="text-xs sm:text-sm md:text-lg font-bold uppercase dark:text-blue-200 text-gray-600"
        >
          Total Downtime
        </div>
        <div
          [ngClass]="getColorClass(totalDowntime, totalThreshold)"
          class="text-2xl sm:text-3xl md:text-5xl font-extrabold"
        >
          {{ formatDuration(totalDowntime) }}
        </div>
      </div>
    </div>
  `,
})
export class DowntimeCardComponent {
  @Input() currentDowntime!: number;
  @Input() totalDowntime!: number;
  @Input() currentThreshold!: Threshold;
  @Input() totalThreshold!: Threshold;

   /* Format hours and minutes for downtime display */
  formatDuration(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
  }

   /* Sets color based on given thresholds */
  getColorClass(score: number, threshold: Threshold): string {
    if (!threshold) return 'text-white dark:text-blue-200';
    if (score <= threshold.low) return 'text-green-600';
    if (score <= threshold.mid) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-500';
  }
}
