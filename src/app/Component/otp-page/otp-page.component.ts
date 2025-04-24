import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Services/apiData.service';
import { CryptoService } from 'src/app/Services/crypto.service';
import { SharedDataService } from 'src/app/Services/sharedData.service';
import { ActivatedRoute } from '@angular/router';
import * as constants from '../../Shared/constants';
import { LoginApiDataService } from 'src/app/Services/loginApiData.service';

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.css','../../Shared/shared_card_styles.css']
})
export class OtpPageComponent {
  loginResponse: any;
  captchaResponse:any;
  captchaImageData:any;
  username:any;
  password:any;
  uuid:any;
  otpForm: FormGroup = new FormGroup({
    otp: new FormControl(''),
  });

  constructor(private router: Router, private loginApiDataservice: LoginApiDataService, private sharedDataService: SharedDataService,
    private cryptoService: CryptoService, private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const state = window.history.state;

     this.username = state.username;
    this.password = state.password;
    this.captchaImageData = state.captchaImage;
    this.uuid=state.uuid
  }



  onSubmit() {

    
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();  // Show errors if the form is invalid
      return;
    }


    const formData = {
      ...this.otpForm.value,
      username: this.username,
      password: this.password,
      captcha : this.captchaImageData,
      uuid:this.uuid
    };console.log("---forData----" + JSON.stringify(formData))



    this.loginApiDataservice.postNoAuth(formData, constants.api.otpValidate).subscribe({
      next: (response: any) => {

          this.sharedDataService.setloginUserData(response);
          localStorage.setItem("accessToken", response.accessToken);
          this.router.navigate(['/apply-quota']);
        
      },
      error: (err) => {
        console.error("Request failed:", err);
        alert(err.error?.message || "Unexpected error");
      }
    });
    
  }
}
