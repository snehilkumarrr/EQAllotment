import { Component } from '@angular/core';
import { SessionStorageService } from '../../Services/session-storage.service';
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
  beforeLogout:boolean=false;
  userName:string='';
  userAuthority:string='';
  constructor(private router: Router, private sharedDataService: SharedDataService,
    private sessionStorageService: SessionStorageService){}
    ngOnInit() {
      const storedUsername = this.sessionStorageService.getItem('username');
      const storedAuthorities = this.sessionStorageService.getObject('authorities');
  
      if (storedUsername) {
        this.userName = storedUsername;
        this.beforeLogout = true;
      }
      console.log("------Username------" +JSON.stringify( this.userName))
      if (storedAuthorities && Array.isArray(storedAuthorities)) {
        this.userAuthority = storedAuthorities[0]; // assuming single role
      }
      console.log("------Authority------" +JSON.stringify( this.userAuthority))
    }
  logoutFunction() {
    this.sessionStorageService.removeItem('username');
    this.sessionStorageService.removeItem('authorities');
    localStorage.removeItem('accessToken');
    
    this.beforeLogout = false;
    this.router.navigate(['/']);
  }
}
