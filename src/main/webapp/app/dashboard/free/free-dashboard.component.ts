import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { combineLatest } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { UpgradeCtaCardComponent } from '../../shared/free-dashboard-ui/upgrade-cta-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jhi-free-dashboard',
  standalone: true,
  imports: [UpgradeCtaCardComponent, NgChartsModule, CommonModule],
  templateUrl: './free-dashboard.component.html',
})
export class FreeDashboardComponent implements OnInit {
  isLoading = true;
  errorMessage: string | null = null;

  sentimentChartData = {
    labels: [] as string[],
    datasets: [{ data: [] as number[], label: 'Sentiment Score' }],
  };

  keywordChartData = {
    labels: [] as string[],
    datasets: [{ data: [] as number[], label: 'Keyword Mentions' }],
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  @ViewChild('sentimentChart') sentimentChart?: BaseChartDirective;
  @ViewChild('keywordChart') keywordChart?: BaseChartDirective;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const trend$ = this.http.get<SentimentPoint[]>('/api/dashboard/sentiment-trend', { withCredentials: true });
    const keywords$ = this.http.get<Record<string, number>>('/api/dashboard/sustainability-keywords', { withCredentials: true });

    combineLatest([trend$, keywords$])
      .pipe(
        map(([trend, keywords]) => {
          this.setSentimentChartData(trend);
          this.setKeywordChartData(keywords);
        }),
        catchError(err => {
          this.errorMessage = 'Failed to load dashboard data.';
          console.error('Dashboard error:', err);
          return [];
        }),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe();
  }

  private setSentimentChartData(data: SentimentPoint[]): void {
    this.sentimentChartData.labels = data.map(p => p.date);
    this.sentimentChartData.datasets[0].data = data.map(p => p.score);
    setTimeout(() => this.sentimentChart?.update(), 0);
  }

  private setKeywordChartData(data: Record<string, number>): void {
    this.keywordChartData.labels = Object.keys(data);
    this.keywordChartData.datasets[0].data = Object.values(data);
    setTimeout(() => this.keywordChart?.update(), 0);
  }
}

export interface SentimentPoint {
  date: string;
  score: number;
}
