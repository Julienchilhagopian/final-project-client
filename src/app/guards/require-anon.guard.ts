import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequireAnonGuard implements CanActivate {

  constructor (
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Promise<any> {
    return this.authService.getMe()
    .then(user => {
     if (user) {
      //  this.router.navigate(['/profile']);
       console.log('you are alreaaaady logged in man');
       return false;
     } else {
       return true;
     }
   })
   .catch(err => console.log(err));
   }
}
