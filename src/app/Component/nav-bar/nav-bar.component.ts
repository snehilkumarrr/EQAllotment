import { Component } from '@angular/core';
import * as constants from '../../Shared/constants';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/Services/sharedData.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  showNavHome:boolean = false;
  showNav:boolean=true;

  constructor(private router: Router, private sharedDataService: SharedDataService,){

  }
}
