import { CommonModule } from '@angular/common';
import { Component, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

// Import child components here when converted
import { SelectBoxComponent } from './components/selectbox/selectbox';
import { ListComponent } from './components/list/list';
import { ButtonPanelComponent } from './components/button-panel/button-panel';
import { ScoreCardComponent } from './components/scorecard/scorecard';
import { DowntimeCardComponent } from './components/downtime-card/downtime-card';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle';
import { ControlToggleComponent } from './components/control-toggle/control-toggle';
import { StatusBannerComponent } from './components/status-banner/status-banner';
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-root',
  imports: [
    CountUpModule,
    RouterOutlet,
    CommonModule,
    FormsModule,
    ListComponent,
    SelectBoxComponent,
    ButtonPanelComponent,
    StatusBannerComponent,
    ThemeToggleComponent,
    ScoreCardComponent,
    ControlToggleComponent,
    DowntimeCardComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('client');
  machines = signal([
    'Machine 1',
    'Machine 2',
    'Machine 3',
    'Machine 4',
    'Machine 5',
    'Machine 6',
    'Machine 7',
    'Machine 8',
    'Machine 9',
    'Machine 10',
    'Machine 12',
    'Machine 13',
    'Machine 14',
    'Machine 15',
  ]);
  operators = signal(['Johnny Walker', 'Jim Beam', 'Evan Williams']);

  selectedMachine = signal(this.machines()[0]);
  selectedOperator = signal(this.operators()[0]);

  targetRate = signal(525);
  averageRate = signal(0);
  totalCount = signal(0);
  currentCount = signal(0);
  percentage = signal(0);
  totalDowntime = signal(0);
  currentDowntime = signal(0);
  avgThreshold = signal({ low: 225, mid: 340 });
  countThreshold = signal({ low: 15000, mid: 34000 });
  percThreshold = signal({ low: 50, mid: 75 });

  showControls = signal(
    localStorage.getItem('showControls') === 'false' ? false : true
  );

  sunVisible = signal(false);

  constructor() {
    // Set sun visibility after delay
    setTimeout(() => this.sunVisible.set(true), 1000);

    // Persist control toggle in localStorage
    effect(() => {
      localStorage.setItem('showControls', this.showControls().toString());
    });

    // Polling logic
    this.startPolling();
  }

  handleStart() {
    console.log('Start Clicked...');
    // Add actual logic here
  }

  handleStop() {
    console.log('Stop Clicked...');
    // Add actual logic here
  }

  async startPolling() {
    const fetchCounts = async () => {
      try {
        const [average, current, total, totalDT, currentDT] = await Promise.all(
          [
            fetch('http://127.0.0.1:3200/average-count').then((res) =>
              res.json()
            ),
            fetch('http://127.0.0.1:3200/current-count').then((res) =>
              res.json()
            ),
            fetch('http://127.0.0.1:3200/total-count').then((res) =>
              res.json()
            ),
            fetch('http://127.0.0.1:3200/total-downtime').then((res) =>
              res.json()
            ),
            fetch('http://127.0.0.1:3200/current-downtime').then((res) =>
              res.json()
            ),
          ]
        );

        this.averageRate.set(average.count);
        this.currentCount.set(current.count);
        this.totalCount.set(total.count);
        this.totalDowntime.set(totalDT.count);
        this.currentDowntime.set(currentDT.count);

        const percent = (average.count * 100) / this.targetRate();
        this.percentage.set(percent);
      } catch (err) {
        console.error('Polling error:', err);
      }
    };

    await fetchCounts();
    setInterval(fetchCounts, 5000);
  }

  toggleControls() {
    this.showControls.set(!this.showControls());
  }

  selectMachine(machine: string) {
    this.selectedMachine.set(machine);
  }

  selectOperator(operator: string) {
    this.selectedOperator.set(operator);
  }
}
// export class App {
//   protected readonly title = signal('client')
// }
