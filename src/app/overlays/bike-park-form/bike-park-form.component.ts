import { Component, OnInit, Input } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-bike-park-form',
  templateUrl: './bike-park-form.component.html',
  styleUrls: ['./bike-park-form.component.css']
})
export class BikeParkFormComponent implements OnInit {

  error = null;
  processing = false;
  feedbackEnabled = false;
  showOverlay = false;

  location: string;
  bikeId: any;

  constructor(
    private bikeService: BikeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bikeService.getBikeId$.subscribe((data) => {
      this.bikeId = data;
      console.log(this.bikeId);
      this.showOverlay = true;
    });
  }

  submitParkForm(form) {
    this.error = '';
    this.feedbackEnabled = true;

    if (form.valid) {
      this.processing = true;
      this.bikeService.updateParkStatus(this.bikeId, true, this.location)
        .then((result) => {
         this.router.navigate(['/profile']);
         this.closeForm();
         this.bikeService.getMine();
        })
        .catch((err) => {
          this.error = err.error;
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

  closeForm() {
    this.showOverlay = false;
  }

}
