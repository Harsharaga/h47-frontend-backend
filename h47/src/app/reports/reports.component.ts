import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reports',
  standalone: true,
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  imports: [CommonModule, HttpClientModule],
})
export class ReportsComponent implements OnInit {
  chartData: any = null;
  errorMessage: string = '';  // Define errorMessage property

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getChartData().subscribe(
      (data) => {
        this.chartData = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load chart data';  // Set errorMessage on failure
        console.error(error);
      }
    );
  }

  // Chart data fetching method
  getChartData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/chart-data');  // Backend endpoint for chart data
  }
}
