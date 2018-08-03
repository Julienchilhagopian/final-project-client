import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = true;
  user: any;
  anon: any;

constructor (
  private authService: AuthService,
  private router: Router
) {}

ngOnInit() {
  this.authService.userChange$.subscribe((user) => {
    this.loading = false;
    this.user = user;
    this.anon = !user;
  });
}

  triggerLogout() {
    this.authService.logout()
    .then(() => {
      this.router.navigate(['']);
    })
    .catch((err) => {
      console.log(err);
    });
  }


}
