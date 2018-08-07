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
    // this.authService.userChange$.subscribe((user) => {
    //   this.user = user;
    //   console.log(user);
    // });
    this.bikeService.bikesChange$.subscribe((bikes) => {
      console.log(bikes);

      if (bikes instanceof Array) {
        this.bikes = bikes;
      } // ERROR SOLVED
    });
  }

  submitReportForm(form) {
      this.error = '';
      this.feedbackEnabled = true;
      this.bikeService.getAllByLocation();

      // if (form.valid) {
      //   this.processing = true;
      //   this.bikeService.getAllByLocation()
      //     .then((result) => {
      //      this.bikes = result;
      //      this.user = this.authService.getUser();
      //     })
      //     .catch((err) => {
      //       this.error = err.error;
      //       this.processing = false;
      //       this.feedbackEnabled = false;
      //     });
      // }
  }

handleReport(id) {
  this.bikeService.reportOne(id, true);
}



}
