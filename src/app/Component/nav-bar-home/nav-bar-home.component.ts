import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/Services/sharedData.service';

@Component({
  selector: 'app-nav-bar-home',
  templateUrl: './nav-bar-home.component.html',
  styleUrls: ['./nav-bar-home.component.css']
})
export class NavBarHomeComponent {
  showNavHome:boolean = true;
  showNav:boolean=false;

}
