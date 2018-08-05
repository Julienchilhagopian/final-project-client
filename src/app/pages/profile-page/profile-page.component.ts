import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BikeService } from '../../services/bike.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
bikes: any;
bikeId: any;

  constructor(
    private authService: AuthService,
    private bikeService: BikeService
  ) {
  this.showMyBikes();
}

ngOnInit() {
  this.bikeService.bikesChange$.subscribe((bikes) => {
    console.log(bikes);

    if (bikes instanceof Array) {
      this.bikes = bikes;
    } // ERROR SOLVED
  });
}

showMyBikes () {
  this.bikeService.getMine()
  .then((result) => {
   this.bikes = result;
  })
  .catch(err => console.log(err));
}

updateId(id) {
  this.bikeId = id;
  this.bikeService.getBikeId(id);
}

updateIdForUnpark(id) {
  this.bikeId = id;
  this.bikeService.updateParkStatus(this.bikeId, false, 'unpark')
  .then((result) => {
    this.bikeService.getMine();
   })
   .catch(err => console.log(err));
}



}
