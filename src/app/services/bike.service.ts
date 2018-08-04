import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private baseUrl = 'http://localhost:3000/bike';

  private bikes: any;

  private bikesChange: Subject<any> = new Subject();
  bikesChange$: Observable<any> = this.bikesChange.asObservable();

  private getBikeIdSubject: Subject<any> = new Subject();
  getBikeId$: Observable<any> = this.getBikeIdSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  private setBikes(bikes?: any) {
    this.bikes = bikes;
    this.bikesChange.next(bikes);
    return bikes;
  }

  getOne() {
    const options = {
      withCredentials: true
    };

    return this.httpClient.get(`${this.baseUrl}/:id`, options)
    .toPromise();

  }

  createBike (color: string, brand: string) {
    const options = {
      withCredentials: true
    };

    const data = {
      color,
      brand
    };
    return this.httpClient.post(`${this.baseUrl}`, data, options)
    .toPromise()
    .then((bikes) => this.setBikes(bikes));
  }

  getMine() {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/mine`, options)
    .toPromise()
    .then((bikes) => this.setBikes(bikes));
  }

  updateParkLocation(id, status, location) {
    const options = {
      withCredentials: true
    };

    console.log('work in progress');
  }

  getBikeId(id) {
    this.getBikeIdSubject.next(id);
  }

}
