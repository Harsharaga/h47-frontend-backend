import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, HttpClientModule],
})
export class DashboardComponent implements OnInit {
  dashboardData: { summary: string; techStack: string; sourceUrl: string } | null = null;
  errorMessage: string = '';

  private apiUrl = 'http://localhost:3000/dashboard'; // Backend dashboard data endpoint

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData() {
    this.http.get<{ summary: string; techStack: string; sourceUrl: string }>(this.apiUrl).subscribe(
      (data) => {
        this.dashboardData = data;
      },
      (error) => {
        console.error('Error fetching dashboard data:', error);
        this.errorMessage = 'Failed to load dashboard data. Please try again later.';
      }
    );
  }

  onLogout() {
    localStorage.removeItem('jwtToken'); // Clear JWT token
    this.router.navigate(['/login']); // Redirect to login
  }
}
