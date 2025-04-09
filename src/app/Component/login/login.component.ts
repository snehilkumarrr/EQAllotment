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

  constructor(private router: Router) {}

  onSubmit() {

    this.router.navigate(['/apply-quota']);
    // if (this.userForm.invalid) {
    //   this.userForm.markAllAsTouched();  // Show errors if the form is invalid
    //   return;
    // }

    // const formData = this.userForm.value;
    // const loginurl = constants.BASE_URL + constants.POST_LOGIN_URL;

    // this._http.post(loginurl, formData).subscribe(
    //   (response: any) => {
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.error("Login error: ", err);
    //     this.alertToastModal = {
    //       type: 'error',
    //       message: err.status === 401 ? 'Wrong credentials. Please try again.' : Utils.handleError(err)
    //     };
    //   }
    // );
  }
}
