import { Component } from '@angular/core';
import { LoginComponent } from './Component/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EQ-Allotment';
  showLoginNavBar = true;
  showHomeNavBar = false;
  showHideNavBar(event:any) {
    var componentArray = [LoginComponent]
    let isMatch = false;
    for (const components of componentArray) {
      if (event instanceof components) {
        isMatch = true;
        break;
      }
    }

    if (isMatch) {
      this.showLoginNavBar = true;
      this.showHomeNavBar = false;
    } else {
      this.showLoginNavBar = false;
      this.showHomeNavBar = true;
    }
  }
}
