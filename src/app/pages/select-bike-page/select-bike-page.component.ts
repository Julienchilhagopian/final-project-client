import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-select-bike-page',
  templateUrl: './select-bike-page.component.html',
  styleUrls: ['./select-bike-page.component.css']
})
export class SelectBikePageComponent implements OnInit {
  bikes: any;
  baseUrl = environment.apiUrl;
  processing: boolean;
  bikeId: any;


  constructor(private bikeService: BikeService) {
    this.bikeService.getMine()
    .then((result) => {
     this.bikes = result;
    })
    .catch(err => console.log(err));
  }

  ngOnInit() {
    this.bikeService.bikesChange$.subscribe((bikes) => {
      if (bikes instanceof Array) {
        this.bikes = bikes;
        this.processing = false;
      }
    });

  }

  updateBikeLocation(id) {
    this.bikeId = id;
    this.processing = true;
    this.bikeService.getBikeId(id);
    this.bikeService.updateParkStatus(id, true);
  }

  updateIdForUnpark(id) {
    this.processing = false;
    this.bikeService.updateParkStatus(id, false)
    .then((result) => {
      this.bikeService.getMine();
     })
     .catch(err => console.log(err));
  }

}
