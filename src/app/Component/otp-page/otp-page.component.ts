import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Services/apiData.service';
import { CryptoService } from 'src/app/Services/crypto.service';
import { SharedDataService } from 'src/app/Services/sharedData.service';

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.css']
})
export class OtpPageComponent {
  loginResponse: any;
  captchaResponse:any;
  captchaImage:any;
  otpForm: FormGroup = new FormGroup({
    otp: new FormControl(''),
    captcha: new FormControl(''),
  });

  constructor(private router: Router, private apiDataservice: ApiDataService, private sharedDataService: SharedDataService,
    private cryptoService: CryptoService
  ) {

    this.sharedDataService.loginCredentialData.subscribe((loginCredentialResponse) => {
      if (loginCredentialResponse) {
        this.loginResponse = loginCredentialResponse;
      }
    });

    this.sharedDataService.captachEncryptionData.subscribe((captachEncryptionResponse) => {
      if (captachEncryptionResponse) {
        this.captchaImage = this.captchaResponse.captchaImage
      }
    });
  }

 get captchaImageFn(): string {
    return 'data:image/png;base64,' + this.captchaImage;
  }

  onSubmit() {

    
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();  // Show errors if the form is invalid
      return;
    }

    console.log("--here--")

    const formData = {
      ...this.otpForm.value,
      username: this.loginResponse.username,
      password: this.loginResponse.password
    };


         this.apiDataservice.postLoginCaptcha(formData).subscribe(
          (response: any) => {
            if (response.success) {
              console.log("Login successful:", response.message);
              const decyptedData = this.cryptoService.decrypt(response.encdata);
              console.log("---1---" +JSON.stringify(decyptedData))
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
