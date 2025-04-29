import { Component } from '@angular/core';
import * as constants from '../../Shared/constants';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/Services/sharedData.service';
import { LoginResponse } from 'src/app/Model/loginResponse';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  showNavHome:boolean = false;
  showNav:boolean=true;
  loginResponse!:LoginResponse;
  showAfterLogin:boolean=false;
  beforeLogout:boolean=false;
  userName:string='';
  userAuthority:string='';
  constructor(private router: Router, private sharedDataService: SharedDataService,){
    this.sharedDataService.loginUserData.subscribe((loginResponse) => {
      if (loginResponse) {
        this.loginResponse = loginResponse;
        // console.log("Username:", loginResponse.username);
        // console.log("Email:", loginResponse.email);
        // console.log("Mobile:", loginResponse.mobile);
        // console.log("Authorities:", loginResponse.authorities[0]);
        // console.log("Access Token:", loginResponse.accessToken);  
        if(this.loginResponse!=null){
          this.userName = this.loginResponse.username
          this.beforeLogout=true;
        }
      }
    });
  }


  logoutFunction(){
    this.sharedDataService.setloginUserData('');
    localStorage.setItem("accessToken",'')
    this.beforeLogout=false
    this.router.navigate(['/']);   
  }
}
