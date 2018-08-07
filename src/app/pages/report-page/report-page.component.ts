import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css']
})
export class ReportPageComponent implements OnInit {
  feedbackEnabled = false;
  error = null;
  processing = false;
  bikes: any;
  user: any;

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

      if (bikes instanceof Array) {
        this.bikes = bikes;
      } // ERROR SOLVED
    });
  }

  submitReportForm(form) {
      this.authService.getMe();
      this.error = '';
      this.feedbackEnabled = true;
      this.bikeService.getAllByLocation();
  }

handleReport(id) {
  this.bikeService.reportOne(id, true);
}



}
