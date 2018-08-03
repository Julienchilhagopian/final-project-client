import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BikeService } from '../../services/bike.service';



@Component({
  selector: 'app-add-bike',
  templateUrl: './add-bike.component.html',
  styleUrls: ['./add-bike.component.css']
})
export class AddBikeComponent implements OnInit {
  showOverlay = true;
  addButtonText = 'Add bike';
  feedbackEnabled = false;
  error = null;
  processing = false;

  color: string;
  brand: string;

  constructor(
    private router: Router,
    private bikeService: BikeService
  ) {}

  ngOnInit() {
  }


  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
    if (!this.showOverlay) {
      this.addButtonText = 'Go back';
    } else {
      this.addButtonText = 'Add bike';
    }
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;

    if (form.valid) {
      this.processing = true;
      this.bikeService.createBike(this.color, this.brand)
        .then((result) => {
         this.router.navigate(['/profile']);
        })
        .catch((err) => {
          this.error = err.error;
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }


}
