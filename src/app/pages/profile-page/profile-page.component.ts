import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
username: string;

  constructor(private authService: AuthService) {
    this.authService.getMe()
    .then((response) => {
      console.log('ok');
      this.username = response.username;
    })
    .catch(err => console.log(err));
  }

  ngOnInit() {}


}
