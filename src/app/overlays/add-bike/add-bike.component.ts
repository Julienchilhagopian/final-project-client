import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  bikeColor: string;
  brand: string;

  constructor(private router: Router) {}

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

  // submitForm(form) {
  //   this.error = '';
  //   this.feedbackEnabled = true;
  //   if (form.valid) {
  //     this.processing = true;
  //     this.createOneService.signup(this.bikeColor, this.brand)
  //       .then((result) => {
  //        this.router.navigate(['/profile']);
  //       })
  //       .catch((err) => {
  //         this.error = err.error;
  //         this.processing = false;
  //         this.feedbackEnabled = false;
  //       });
  //   }
  // }


}
