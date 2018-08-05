import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';

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

  searchLocation: string;

  constructor(
    private bikeService: BikeService
  ) {}

  ngOnInit() {
  }

  submitReportForm(form) {
      this.error = '';
      this.feedbackEnabled = true;

      if (form.valid) {
        this.processing = true;
        this.bikeService.getAllByLocation(this.searchLocation)
          .then((result) => {
           this.bikes = result;
          })
          .catch((err) => {
            this.error = err.error;
            this.processing = false;
            this.feedbackEnabled = false;
          });
      }
  }

handleReport(id) {
  this.bikeService.reportOne(id);
}

}
