import { Component, OnInit } from '@angular/core';
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
  showOverlay = true;

  location: string;


  constructor(
    private bikeService: BikeService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  submitParkForm(form) {
    this.error = '';
    this.feedbackEnabled = true;

    if (form.valid) {
      this.processing = true;
      this.bikeService.updateParkLocation(this.location)
        .then((result) => {
         this.router.navigate(['/profile']);
         this.bikeService.getMine();
        })
        .catch((err) => {
          this.error = err.error;
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

}
