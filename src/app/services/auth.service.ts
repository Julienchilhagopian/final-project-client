import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
private baseUrl = 'http://localhost:3000/auth';

private user: any;
private userChange: Subject<any> = new Subject();
userChange$: Observable<any> = this.userChange.asObservable();


  constructor(private httpClient: HttpClient) {}

  private setUser(user?: any) {
    this.user = user;
    this.userChange.next(user);
    return user;
  }

  getMe() {
    const options = {
      withCredentials: true
    };

    return this.httpClient.get(`${this.baseUrl}/me`, options)
      .toPromise()
      .then((user) => this.setUser(user))
      .catch((err) => {
        if (err.status === 404) {
          this.setUser();
          return null;
        } else {
          Promise.reject(new Error('unexpected error'));
        }
      });
   }

   signup (username: string, password: string, email: string) {
    const options = {
      withCredentials: true
    };
    const data = {
      username,
      password,
      email
    };
    return this.httpClient.post(`${this.baseUrl}/signup`, data, options)
      .toPromise()
      .then((user) => this.setUser(user));
   }

  login (username: string, password: string) {
    const options = {
      withCredentials: true
    };
    const data = {
      username,
      password
    };
    return this.httpClient.post(`${this.baseUrl}/login`, data, options)
      .toPromise()
      .then((user) => this.setUser(user));
   }

   logout () {
    const options = {
      withCredentials: true
    };

    return this.httpClient.post(`${this.baseUrl}/logout`, {}, options)
      .toPromise()
      .then(() => this.setUser());
   }

   getUser(): any {
    return this.user;
  }

}
