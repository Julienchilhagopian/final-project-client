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
  processing: boolean;
  bikes: any;
  user: any;
  reportProcessing: boolean;

  baseUrl = environment.apiUrl;

  constructor(
    private bikeService: BikeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.userChange$.subscribe((user) => {
      this.user = user;
    });
    this.bikeService.bikesChange$.subscribe((bikes) => {
      this.processing = false;
      this.reportProcessing = false;
      if (bikes instanceof Array) {
        this.bikes = bikes;
      }
    });
  }

  submitReportForm(form) {
      this.processing = true;
      this.authService.getMe();
      this.bikeService.getAllByLocation();
  }

handleReport(id, number) {
  this.bikeService.reportOne(id, number , true);
  this.reportProcessing = true;
}



}
