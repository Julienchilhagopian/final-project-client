import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private baseUrl = 'http://localhost:3000/bike';
  private myBikes: any;

  constructor(private httpClient: HttpClient) {}


  createBike (color: string, brand: string) {
    const options = {
      withCredentials: true
    };

    const data = {
      color,
      brand
    };

    return this.httpClient.post(`${this.baseUrl}`, data, options)
    .toPromise();
  }

  getMine() {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/mine`, options)
    .toPromise();
  }

}
