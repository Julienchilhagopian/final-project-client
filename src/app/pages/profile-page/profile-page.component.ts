'use strict';

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BikeService } from '../../services/bike.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  bikes: any;
  bikeId: any;
  baseUrl = environment.apiUrl;
  processing: boolean;

  coordinatesArray = [];

  launchLocalisation: any;
  options = {
    enableHighAccuracy: false,
    timeout: 60000,
    maximumAge: 0
  };
  finalDistance: any;

  constructor(
    private authService: AuthService,
    private bikeService: BikeService
  ) {
    this.showMyBikes();
  }

  ngOnInit() {
    this.bikeService.bikesChange$.subscribe((bikes) => {
      // console.log(bikes);
      if (bikes instanceof Array) {
        this.bikes = bikes;
        this.processing = false;
      }
    });
  }

  showMyBikes () {
    this.bikeService.getMine()
    .then((result) => {
    this.bikes = result;
    })
    .catch(err => console.log(err));
  }

  updateBikeLocation(id) {
    this.bikeId = id;
    this.processing = true;
    this.bikeService.getBikeId(id);
    this.bikeService.updateParkStatus(id, true);
    // this.launchLocalisation = this.bikeService.geoLocalisation(this.success.bind(this), this.error, this.options);
  }

  updateIdForUnpark(id) {
    this.processing = false;
    this.bikeService.updateParkStatus(id, false)
    .then((result) => {
      this.bikeService.getMine();
    })
    .catch(err => console.log(err));
  }

  toggleReportStatus(id) {
    this.bikeService.reportOne(id, null, false)
    .then((result) => {
      this.bikeService.getMine();
    })
    .catch(err => console.log(err));
  }


  // ---- AUTOMATIC UNPARK PART ---- //

  distance (lat1, lon1, lat2, lon2, unit) {
      const radlat1 = Math.PI * lat1 / 180;
      const radlat2 = Math.PI * lat2 / 180;
      const theta = lon1 - lon2;
      const radtheta = Math.PI * theta / 180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === 'K') { dist = dist * 1.609344; }
      if (unit === 'N') { dist = dist * 0.8684; }

    this.finalDistance = dist;
    // console.log('Distance Point A - Point B = ' + this.finalDistance);
  return dist;
  }


  success(pos) {
    const coordinates = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    };


    const testArray = [];
    testArray.push(coordinates);
    this.coordinatesArray.push(coordinates);

    if (this.coordinatesArray.length >= 2) {
      const pointA: any = this.coordinatesArray[0];
      const pointB: any = this.coordinatesArray[1];

      // console.log(pointA, pointB);

    this.distance(pointA.latitude, pointA.longitude, pointB.latitude, pointB.longitude, 'K');
      if (this.finalDistance >= 0.0233) {
        // console.log('YOU ARE ON A BIIIIKE');
        this.updateIdForUnpark(this.bikeId);
        navigator.geolocation.clearWatch(this.launchLocalisation);
      }
      this.coordinatesArray = [];
    }
    console.log(this.coordinatesArray);
  }

  error(err) {
    console.log('ERROR(' + err.code + '): ' + err.message);
  }




}
