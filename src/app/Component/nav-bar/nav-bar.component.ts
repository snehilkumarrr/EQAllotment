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
  loginResponse:LoginResponse |null= null;
  showAfterLogin:boolean=false;
  beforeLogout:boolean=false;
  userName:string='';
  userAuthority:string='';
  constructor(private router: Router, private sharedDataService: SharedDataService,){
    this.sharedDataService.loginUserData.subscribe((loginResponse) => {
      if (loginResponse) {
        this.loginResponse = loginResponse;
        if(this.loginResponse!=null){
          this.userName = this.loginResponse.username
          this.beforeLogout=true;
        }
      }
    });
  }


  logoutFunction(){
    this.sharedDataService.setloginUserData('');
    this.loginResponse=null
    localStorage.setItem("accessToken",'')
    this.beforeLogout=false
    this.router.navigate(['/']);   
  }
}
