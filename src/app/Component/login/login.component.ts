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
  captchaImage:any;
  uuid:any;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    captcha: new FormControl('')
  });

  constructor(private router: Router, private apiDataservice: ApiDataService, private cryptoService:CryptoService,
    private sharedDataService: SharedDataService
  ) {}

  get captchaImageFn(): string {
    return 'data:image/png;base64,' + this.captchaImage;
  }

  ngOnInit(){
    this.getCaptcha()
  }

  getCaptcha(){
    this.apiDataservice.getNoAuthNoParam( constants.api.noAuthCaptcha).subscribe(
      (response: any) => {
        if (response.success) {
       
          const decyptedData = this.cryptoService.decrypt(response.encdata);
          this.captchaImage = decyptedData.captchaImage
          this.uuid =decyptedData.uuid

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

  onSubmit() {

    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();  // Show errors if the form is invalid
      return;
    }



    const formData = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
      captcha: this.loginForm.get('captcha')?.value,
      uuid: this.uuid
    }
    console.log("==---form====" + JSON.stringify(formData))


    this.apiDataservice.postAuth(formData, constants.api.loginwithcaptcha).subscribe(
      (response: any) => {
        if (response.success) {
       
          const decyptedData = this.cryptoService.decrypt(response.encdata);
          this.sharedDataService.setCaptachEncryptionData(decyptedData);

          this.router.navigate(['/otp-page'], {
            state: {
              username: this.loginForm.value.username,
              password: this.loginForm.value.password,
              captchaImage: this.loginForm.value.captcha,
              uuid:this.uuid
            }
          });       

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
