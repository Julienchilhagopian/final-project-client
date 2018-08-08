import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable} from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private baseUrl = environment.apiUrl + '/bike';

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
  // getOne() {
  //   const options = {
  //     withCredentials: true
  //   };

  //   return this.httpClient.get(`${this.baseUrl}/:id`, options)
  //   .toPromise();

  // }

  // not used
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

  updateParkStatus(id: string, parkStatus: boolean) {
    const options = {
      withCredentials: true
    };


    if (navigator.geolocation && parkStatus) {
      const getPosition = () => {
        return new Promise( (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      };

      getPosition()
      .then((position: any) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);

        const data = {
          id,
          parkStatus,
          latitude,
          longitude
        };


        return this.httpClient.put(`${this.baseUrl}/status`, data,  options)
        .toPromise()
        .then((bikes) => this.getMine());

        })

      .catch((err) => {
        console.error(err.message);
        });

    } else {
      const data = {
        id,
        parkStatus,
      };

      return this.httpClient.put(`${this.baseUrl}/status`, data,  options)
        .toPromise()
        .then((bikes) => this.setBikes(bikes));
    }

  }

  getBikeId(id) {
    this.getBikeIdSubject.next(id);
  }

  getAllByLocation() {
    const options = {
      withCredentials: true
    };

    if (navigator.geolocation) {
      const getPosition = () => {
        return new Promise( (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      };

      getPosition()
        .then((position: any) => {
          const center = `latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`;
          console.log(center);
          return this.httpClient.get(`${this.baseUrl}?${center}`, options)
            .toPromise()
            .then((bikes) => this.setBikes(bikes));

        })
        .catch((err) => {
          console.error(err.message);
        });
    }

  }


  reportOne(id, number, reportStatus) {
    const options = {
      withCredentials: true
    };

    const data = {
      id,
      number,
      reportStatus
    };

    return this.httpClient.put(`${this.baseUrl}/report`, data,  options)
    .toPromise();
  }


  geoLocalisation(success, error, options) {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(success, error, options);
    }
  }


}
