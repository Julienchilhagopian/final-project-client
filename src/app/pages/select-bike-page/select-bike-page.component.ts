import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';

@Component({
  selector: 'app-select-bike-page',
  templateUrl: './select-bike-page.component.html',
  styleUrls: ['./select-bike-page.component.css']
})
export class SelectBikePageComponent implements OnInit {
  bikes: any;
  bikeId: any;

  constructor(private bikeService: BikeService) {
    this.bikeService.getMine()
    .then((result) => {
     this.bikes = result;
    })
    .catch(err => console.log(err));
  }

  ngOnInit() {
  }

  handleId(id) {
    this.bikeId = id;
    this.bikeService.getBikeId(id);
  }



}