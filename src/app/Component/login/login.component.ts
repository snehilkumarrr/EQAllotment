import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
 import { Utils } from '../../Shared/Utils';
 import * as constants from '../../Shared/constants';
import { ApiDataService } from 'src/app/Services/apiData.service';
import { SharedDataService } from 'src/app/Services/sharedData.service';
import { CryptoService } from 'src/app/Services/crypto.service';
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

  constructor(private router: Router, private apiDataservice: ApiDataService, private cryptoService:CryptoService,
    private sharedDataService: SharedDataService
  ) {}

  onSubmit() {

    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();  // Show errors if the form is invalid
      return;
    }



    const formData = this.loginForm.value;

    this.sharedDataService.setLoginCredentialData(formData)

    this.apiDataservice.postLogin(formData).subscribe(
      (response: any) => {
        if (response.success) {
       
          const decyptedData = this.cryptoService.decrypt(response.encdata);
          this.sharedDataService.setCaptachEncryptionData(decyptedData);
          this.router.navigate(['/otp-page']);
        }
      },
      (error) => {
        console.error("--error response--", error);
        const errorMessage = error?.error?.message || "An unexpected error occurred.";
        console.log("Login failed:", errorMessage);
        alert(errorMessage);
      }
    );
    
  }
}
