import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css']
})
export class ReportPageComponent implements OnInit {
  feedbackEnabled = false;
  error = null;
  processing: boolean;
  bikes: any;
  user: any;
  baseUrl = environment.apiUrl;


  test: any;
  searchLocation: string;

  constructor(
    private bikeService: BikeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.userChange$.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
    this.bikeService.bikesChange$.subscribe((bikes) => {
      console.log(bikes);
      this.processing = false;

      if (bikes instanceof Array) {
        this.bikes = bikes;
      } // ERROR SOLVED
    });
  }

  submitReportForm(form) {
      this.processing = true;
      this.authService.getMe();
      this.error = '';
      this.feedbackEnabled = true;
      this.bikeService.getAllByLocation();
  }

handleReport(id, number) {
  this.bikeService.reportOne(id, number , true);
}



}
