import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  logout(): void {
    localStorage.removeItem('authToken'); // or sessionStorage
    // Optionally, clear other session data
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
