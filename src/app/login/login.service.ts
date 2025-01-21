import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Utils } from '../data/utils';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  ROOT_URL = "http://10.10.10.144/api/";

  private readonly tokenKey = 'authToken';

  constructor(private http:HttpClient) {
  }

  login(data:{
    username:String,
    password:String,
  }) {
    return Utils.createAuthSign(data).pipe(
      switchMap(sign =>
        this.http.post<{ username: string, password: string }>(`${this.ROOT_URL}/login`, data, Utils.httpHeaders({ sign }))
      ),
      map(res => {
        return res;
      }),
      catchError(err => {
        throw err;
      })
    );
  }

  afterLogin(res:any)
  {

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

