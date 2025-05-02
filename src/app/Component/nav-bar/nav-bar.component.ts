import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userName: string = '';
  userAuthority: string = '';
  beforeLogout: boolean = false;

  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit() {
    this.loadSessionData();  // Load initially when component mounts

    // Listen for route changes and re-check session storage
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadSessionData(); // Reload session data on each route change
    });
  }

  loadSessionData() {
    const storedUsername = this.sessionStorageService.getItem('username');
    const storedAuthorities = this.sessionStorageService.getObject('authorities');

    this.beforeLogout = !!storedUsername;
    this.userName = storedUsername || '';
    this.userAuthority = (storedAuthorities && storedAuthorities[0]) || '';
  }

  logoutFunction() {
    this.sessionStorageService.removeItem('username');
    this.sessionStorageService.removeItem('authorities');
    localStorage.removeItem('accessToken');

    this.beforeLogout = false;
    this.userName = '';
    this.userAuthority = '';

    this.router.navigate(['/']);
  }
}
