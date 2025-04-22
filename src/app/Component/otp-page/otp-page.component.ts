import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Services/apiData.service';
import { CryptoService } from 'src/app/Services/crypto.service';
import { SharedDataService } from 'src/app/Services/sharedData.service';
import { ActivatedRoute } from '@angular/router';
import * as constants from '../../Shared/constants';

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.css']
})
export class OtpPageComponent {
  loginResponse: any;
  captchaResponse:any;
  captchaImage:any;
  username:any;
  password:any;
  otpForm: FormGroup = new FormGroup({
    otp: new FormControl(''),
    captcha: new FormControl(''),
  });

  constructor(private router: Router, private apiDataservice: ApiDataService, private sharedDataService: SharedDataService,
    private cryptoService: CryptoService, private route: ActivatedRoute
  ) {

    this.sharedDataService.captachEncryptionData.subscribe((captachEncryptionResponse) => {
      if (captachEncryptionResponse) {
       
        this.captchaImage = captachEncryptionResponse.captchaImage
      }
    });
  }

  ngOnInit() {
    const state = window.history.state;

     this.username = state.username;
    this.password = state.password;
  }

 get captchaImageFn(): string {
    return 'data:image/png;base64,' + this.captchaImage;
  }

  onSubmit() {

    
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();  // Show errors if the form is invalid
      return;
    }


    const formData = {
      ...this.otpForm.value,
      username: this.username,
      password: this.password
    };




         this.apiDataservice.postAuth(formData,constants.api.noAuthLogin).subscribe(
          (response: any) => {
            if (response.success) {
              const captchaDecyptedData = this.cryptoService.decrypt(response.encdata);
              this.sharedDataService.setloginUserData(captchaDecyptedData);
              localStorage.setItem("accessToken",captchaDecyptedData.accessToken)
              this.router.navigate(['/apply-quota']);   

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
