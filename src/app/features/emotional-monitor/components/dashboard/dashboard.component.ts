import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmotionalStateService } from '../../../../core/services/emotional-state.service';
import { EmotionalState, ChartData } from '../../../../core/models/emotional-state.model';

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  states: EmotionalState[] = [];
  chartData: ChartData | null = null;
  chartOptions: any;

  constructor(
    private emotionalStateService: EmotionalStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.initChartOptions();
  }

  loadData(): void {
    const userId = 'user1'; // Mock user ID

    this.emotionalStateService.getEmotionalStates(userId).subscribe(states => {
      this.states = states.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });

    this.emotionalStateService.getChartData(userId).subscribe(data => {
      this.chartData = data;
    });
  }

  initChartOptions(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          min: 0,
          max: 10,
          ticks: {
            color: textColorSecondary,
            stepSize: 1
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }

  navigateToInput(): void {
    this.router.navigate(['/emotional-monitor/input']);
  }

  getAverageState(): number {
    if (this.states.length === 0) return 0;
    const sum = this.states.reduce((acc, state) => acc + state.generalState, 0);
    return Math.round((sum / this.states.length) * 10) / 10;
  }

  getRecentEmotions(): string {
    if (this.states.length === 0) return 'Немає даних';
    const recent = this.states[0];
    return recent.emotions.join(', ');
  }
}
