import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private readonly tokenKey = 'authToken';

  constructor(private httpService: HttpService) { }
  login(username: string, password: string) {
    const loginData = {
      username,
      password
    };

    return this.httpService.post('/login', loginData)
      .then(response => {
        const token = response.data.token;
        if (token) {
          this.setAuthToken(token);
          return token;
        } else {
          throw new Error('Token not received');
        }
      })
      .catch(error => {
        console.error('Login failed:', error);
        throw error;
      });
  }

  // Set the token in localStorage
  setAuthToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Get the token from localStorage
  getAuthToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // Clear the token from localStorage (logout)
  clearAuthToken() {
    localStorage.removeItem(this.tokenKey);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }
}

