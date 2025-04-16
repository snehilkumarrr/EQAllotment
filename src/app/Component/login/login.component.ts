import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
 import { Utils } from '../../Shared/Utils';
 import * as constants from '../../Shared/constants';
import { ApiDataService } from 'src/app/Services/apiData.service';
import { SharedDataService } from 'src/app/Services/sharedData.service';
// import { HeaderDataService } from 'src/app/Services/headerData.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../Shared/shared_card_styles.css']
})
export class LoginComponent {
  loginResponse: any;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private apiDataservice: ApiDataService) {}

  onSubmit() {

    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();  // Show errors if the form is invalid
      return;
    }

    console.log("--here--")

    const formData = this.loginForm.value;
    this.router.navigate(['/apply-quota']);

    this.apiDataservice.postLogin(formData).subscribe(
      (response) => {

        //this.tableData1 = Utils.fetchData(response as any);
      },
      (error) => console.error('Error adding location:', error)
    );
  }
}
