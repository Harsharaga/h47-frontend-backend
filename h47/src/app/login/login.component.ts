import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule], // Include HttpClientModule in standalone imports
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  private apiUrl = 'http://localhost:3000/login'; // Backend login endpoint

  constructor(private http: HttpClient, private router: Router) {}

  // Login method with JWT handling
  onLogin() {
    const credentials = { username: this.username, password: this.password };

    this.http.post<{ token: string }>(this.apiUrl, credentials).subscribe(
      (response) => {
        console.log('Login successful:', response);

        // Store the JWT token in localStorage
        localStorage.setItem('jwtToken', response.token);

        // Navigate to the dashboard after login
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Login failed! Please check your credentials.';
      }
    );
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken'); // Returns true if a token exists
  }

  // Method to log out the user
  onLogout() {
    localStorage.removeItem('jwtToken'); // Clear the JWT token
    console.log('User logged out');
    this.router.navigate(['/login']); // Redirect to login page
  }
}
