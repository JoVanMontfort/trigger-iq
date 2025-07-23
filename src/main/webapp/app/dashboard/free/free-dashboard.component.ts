import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { combineLatest, of } from 'rxjs';
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
    maintainAspectRatio: false, // allow canvas to fill parent
    plugins: {
      legend: { display: true },
    },
  };

  recentFeedback: ExtendedFeedbackEntry[] = [];

  @ViewChild('sentimentChart') sentimentChart?: BaseChartDirective;
  @ViewChild('keywordChart') keywordChart?: BaseChartDirective;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const trend$ = this.http.get<SentimentPoint[]>('/api/dashboard/sentiment-trend', { withCredentials: true });
    const keywords$ = this.http.get<Record<string, number>>('/api/dashboard/sustainability-keywords', { withCredentials: true });
    const feedback$ = this.http.get<FeedbackEntry[]>('/api/dashboard/recent-feedback', { withCredentials: true });

    combineLatest([trend$, keywords$, feedback$])
      .pipe(
        map(([trend, keywords, feedback]) => {
          this.setSentimentChartData(trend);
          this.setKeywordChartData(keywords);
          this.setRecentFeedback(feedback);
        }),
        catchError(err => {
          this.errorMessage = '❌ Failed to load dashboard data.';
          console.error('Dashboard load error:', err);
          return of(); // return empty observable
        }),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe();
  }

  private setSentimentChartData(data: SentimentPoint[]): void {
    this.sentimentChartData.labels = data.map(p => p.date);
    this.sentimentChartData.datasets[0].data = data.map(p => p.score);
    requestAnimationFrame(() => this.sentimentChart?.update());
  }

  private setKeywordChartData(data: Record<string, number>): void {
    this.keywordChartData.labels = Object.keys(data);
    this.keywordChartData.datasets[0].data = Object.values(data);
    requestAnimationFrame(() => this.keywordChart?.update());
  }

  private setRecentFeedback(data: FeedbackEntry[]): void {
    const filtered = data.filter(entry => typeof entry.comment === 'string' && entry.comment.trim().length > 0);

    this.recentFeedback = filtered.map(entry => {
      const entryDate = new Date(entry.timestamp);
      let closestIndex = -1;
      let minDiff = Infinity;

      this.sentimentChartData.labels.forEach((label, idx) => {
        const sentimentDate = new Date(label);
        const diff = Math.abs(entryDate.getTime() - sentimentDate.getTime());
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = idx;
        }
      });

      const sentimentScore = closestIndex !== -1 ? this.sentimentChartData.datasets[0].data[closestIndex] : undefined;

      const feedbackText = entry.comment?.toLowerCase() ?? '';
      const matchedKeywords = this.keywordChartData.labels.filter(keyword => feedbackText.includes(keyword.toLowerCase()));

      return {
        ...entry,
        sentimentScore,
        matchedKeywords,
      };
    });

    console.warn('✅ Final feedback list:', this.recentFeedback);
  }
}

export interface SentimentPoint {
  date: string;
  score: number;
}

export interface FeedbackEntry {
  comment: string | null;
  sentiment: string;
  timestamp: string;
}

export interface ExtendedFeedbackEntry extends FeedbackEntry {
  sentimentScore?: number;
  matchedKeywords?: string[];
}
