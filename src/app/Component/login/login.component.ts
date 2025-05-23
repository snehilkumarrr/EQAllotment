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
  captchaImage:any;
  uuid:any;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    captcha: new FormControl('')
  });

  constructor(private router: Router, private apiDataService: ApiDataService, private cryptoService:CryptoService,
    private sharedDataService: SharedDataService
  ) {}

  get captchaImageFn(): string {
    return 'data:image/png;base64,' + this.captchaImage;
  }

  ngOnInit(){
    this.getCaptcha()
  }

  getCaptcha(){
    this.apiDataService.get( null,constants.api.noAuthCaptcha).subscribe({
      next: (response: any) => {
        this.captchaImage = response.captchaImage
        this.uuid =response.uuid
         
      },
      error: (err) => {
        console.error("🚨 Error from API:", err);
        alert("Something went wrong while fetching data.");
      }
    });
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


    this.apiDataService.post(formData, constants.api.loginwithcaptcha).subscribe(
      (response: any) => {
          this.sharedDataService.setCaptachEncryptionData(response);
           // Save useful values in session storage
          

          this.router.navigate(['/otp-page'], {
            state: {
              username: this.loginForm.value.username,
              password: this.loginForm.value.password,
              captchaImage: this.loginForm.value.captcha,
              uuid:this.uuid
            }
          });       

      },
    );
    
  }
}
