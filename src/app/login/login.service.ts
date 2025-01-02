import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private readonly tokenKey = 'authToken';

  constructor(private http:HttpClient) { }

  login(data:any) {
    const loginData = {
      username:"gdojgd",
      password:"sudgusgd"
    };



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

