import { Component } from '@angular/core';
import * as constants from '../../Shared/constants';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  showNavHome:boolean = false;
  showNav:boolean=true;

}
