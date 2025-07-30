import { Component, Input } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { heroUserSolid, heroAtSymbolSolid } from "@ng-icons/heroicons/solid";

@Component({
  selector: "app-status-banner",
  standalone: true,
  viewProviders: [provideIcons({ heroUserSolid, heroAtSymbolSolid })],
  imports: [NgIcon],
  template: `
    <div
      class="w-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-blue-200 p-3 rounded shadow text-center transition-all duration-300 transform animate-fade-in-slide"
    >
      <p
        class="text-sm md:text-base font-medium uppercase flex flex-col md:flex-row items-center justify-center gap-1"
      >
        <span class="flex items-center gap-1">
          <ng-icon
            class="dark:text-blue-300 text-gray-700"
            name="heroUserSolid"
          />
          &nbsp;&nbsp;
          <span class="font-semibold">{{ operator }}</span>
        </span>

        <span class="hidden md:inline">&nbsp;&nbsp;</span>

        <span class="flex items-center gap-1"
          ><ng-icon
            class="dark:text-blue-300 text-gray-700"
            name="heroAtSymbolSolid"
          />
          &nbsp;&nbsp;
          <span class="font-semibold">{{ machine || "None Selected" }}</span>
        </span>
      </p>
    </div>
  `,
  styles: [
    `
      /* Added to prevent Angular from complaining */
    `,
  ],
})
export class StatusBannerComponent {
  @Input() operator: string = "";
  @Input() machine: string | null = null;
}
