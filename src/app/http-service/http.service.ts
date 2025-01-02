import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: environment.baseUrl,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  get(endpoint: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.get(endpoint, config);
  }

  post(endpoint: string, data: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.post(endpoint, data, config);
  }


}
