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

  // getOne is not used
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

  updateParkStatus(id: string, parkStatus: boolean, location: string) {
    const options = {
      withCredentials: true
    };

    const data = {
      id,
      parkStatus,
      location
    };

    return this.httpClient.put(`${this.baseUrl}/status`, data,  options)
    .toPromise()
    .then((bikes) => this.setBikes(bikes));
  }

  getBikeId(id) {
    this.getBikeIdSubject.next(id);
  }

  getAllByLocation(location) {
    const options = {
      withCredentials: true
    };

    return this.httpClient.get(`${this.baseUrl}?location=${location}`, options)
    .toPromise();
    // .then((bikes) => this.setBikes(bikes));
  }


  reportOne(id, reportStatus) {
    const options = {
      withCredentials: true
    };

    const data = {
      id,
      reportStatus
    };

    return this.httpClient.put(`${this.baseUrl}/report`, data,  options)
    .toPromise();
  }

}
