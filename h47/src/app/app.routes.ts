import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'summary',
    loadComponent: () =>
      import('./summary/summary.component').then((m) => m.SummaryComponent),  // Add Summary page route
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./reports/reports.component').then((m) => m.ReportsComponent),  // Add Reports page route
  },
  {
    path: 'logout',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '**', // Wildcard route to handle unknown paths and redirect to login page
    redirectTo: 'login',
  },
];
