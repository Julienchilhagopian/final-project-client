import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logoutButton = false;

constructor (
  private authService: AuthService,
  private router: Router
) {
 this.displayLogoutButton();
}

  activateLogout() {
    this.authService.logout()
    .then(() => {
      this.router.navigate(['']);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  displayLogoutButton () {
    this.authService.getMe()
    .then(user => {
     if (!user) {
       this.logoutButton = false;
     } else {
      this.logoutButton = true;
     }
   })
   .catch((err) => {
     console.log(err);
    });
  }


}
