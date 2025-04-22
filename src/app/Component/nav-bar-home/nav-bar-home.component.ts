import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar-home',
  templateUrl: './nav-bar-home.component.html',
  styleUrls: ['./nav-bar-home.component.css']
})
export class NavBarHomeComponent {
  showNavHome:boolean = true;
  showNav:boolean=false;
}
