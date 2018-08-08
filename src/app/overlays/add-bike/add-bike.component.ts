import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BikeService } from '../../services/bike.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../../environments/environment.prod';


const URL = 'http://localhost:3000/bike';

@Component({
  selector: 'app-add-bike',
  templateUrl: './add-bike.component.html',
  styleUrls: ['./add-bike.component.css']
})
export class AddBikeComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL
  });

  showOverlay = false;
  addButtonText = '+';
  feedbackEnabled = false;
  error = null;
  processing = false;

  number: number;
  brand: string;

  constructor(
    private router: Router,
    private bikeService: BikeService
  ) {
    this.uploader.onSuccessItem = (item, response) => {
      this.router.navigate(['/profile']);
      this.toggleOverlay();
      this.bikeService.getMine();
    };
    this.uploader.onErrorItem = (item, response, status, headers) => {
      console.log('upload not ok');
    };
  }

  ngOnInit() {
  }


  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
    if (!this.showOverlay) {
      this.addButtonText = '+';
    } else {
      this.addButtonText = '-';
    }
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;

    if (form.valid) {
      this.processing = true;
      this.uploader.onBuildItemForm = (item, form2) => {
        form2.append('number', this.number);
        form2.append('brand', this.brand);
      };
    }
    this.uploader.uploadAll();
  }

}
