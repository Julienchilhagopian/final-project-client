import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';

@Component({
  selector: 'app-select-bike-page',
  templateUrl: './select-bike-page.component.html',
  styleUrls: ['./select-bike-page.component.css']
})
export class SelectBikePageComponent implements OnInit {
  bikes: any;


  constructor(private bikeService: BikeService) {
    this.bikeService.getMine()
    .then((result) => {
     this.bikes = result;
    })
    .catch(err => console.log(err));
  }

  ngOnInit() {
    this.bikeService.bikesChange$.subscribe((bikes) => {
      console.log(bikes);
      if (bikes instanceof Array) {
        this.bikes = bikes;
      }
    });

  }

  updateBikeLocation(id) {
    this.bikeService.getBikeId(id);
    this.bikeService.updateParkStatus(id, true);
  }

  updateIdForUnpark(id) {
    this.bikeService.updateParkStatus(id, false)
    .then((result) => {
      this.bikeService.getMine();
     })
     .catch(err => console.log(err));
  }

}
