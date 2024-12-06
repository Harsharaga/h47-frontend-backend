import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Makes this service globally available
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/login'; // Backend login URL
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null); // Token management

  constructor(private http: HttpClient) {}

  // Method to login and get JWT token
  login(credentials: { username: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, credentials);
  }

  // Get the current token from local storage
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Method to log out and clear the token
  logout(): void {
    localStorage.removeItem('jwtToken');
    this.tokenSubject.next(null); // Update the token state
  }

  // Observable to track login state
  isLoggedIn(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }
}
