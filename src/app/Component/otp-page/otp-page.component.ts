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

  constructor(private router: Router, private apiDataService: ApiDataService, private sharedDataService: SharedDataService,
    private cryptoService: CryptoService, private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const state = window.history.state;

    if (!state || !state.username) {
      this.router.navigate(['/']); 
      return;
    }
  
    console.log('abc', JSON.stringify(state));
    this.username = state.username;
    this.password = state.password;
    this.captchaImageData = state.captchaImage;
    this.uuid = state.uuid;
  

    history.replaceState(null, '', location.href);
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
    };



    this.apiDataService.post(formData, constants.api.otpValidate).subscribe({
      next: (response: any) => {

          this.sharedDataService.setloginUserData(response);
          localStorage.setItem("accessToken", response.accessToken);
          if(response.authorities[0]==constants.RoleName.roleAa || response.authorities[0]==constants.RoleName.roleRail){
            this.router.navigate(['/user-history']);
          }else{
            this.router.navigate(['/apply-quota']);
          }
          
        
      },
      error: (err) => {
        console.error("Request failed:", err);
        alert(err.error?.message || "Unexpected error");
      }
    });
    
  }
}
