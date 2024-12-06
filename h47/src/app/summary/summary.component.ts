
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';  // To work with Observables
import { Chart } from 'chart.js';
import { Component, OnInit, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  imports: [CommonModule, HttpClientModule],
})
export class SummaryComponent implements OnInit, AfterViewInit {
  chartData: any = null;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getChartData().subscribe(
      (data) => {
        this.chartData = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load chart data';
        console.error(error);
      }
    );
  }

  ngAfterViewInit(): void {
    // Create chart once the view is initialized and the canvas is available
    if (this.chartData) {
      this.createChart();
    }
  }

  // Chart data fetching method
  getChartData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/chart-data');
  }

  // Create Chart.js chart
  createChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    
    // Ensure canvas exists
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.chartData.labels,
          datasets: [{
            label: 'Innovations',
            data: this.chartData.values,
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Canvas element not found');
    }
  }
}