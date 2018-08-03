import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private baseUrl = 'http://localhost:3000';


  constructor(private httpClient: HttpClient) {}


  createBike (color: string, brand: string) {
    const options = {
      withCredentials: true
    };

    const data = {
      color,
      brand
    };

    return this.httpClient.post(`${this.baseUrl}/bike`, data, options)
    .toPromise();
  }
}
