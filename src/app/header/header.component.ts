import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  adminIsAuthenticated = false;
  role: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.role = this.authService.getUserRole();
    if (this.role === 'user') {
      this.userIsAuthenticated = this.authService.getIsAuth();
    } else if (this.role === 'admin') {
      this.adminIsAuthenticated = this.authService.getIsAuth();
    } else {
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.adminIsAuthenticated = this.authService.getIsAuth();
    }
    // this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.role = this.authService.getUserRole();
        if (this.role === 'user') {
          this.userIsAuthenticated = isAuthenticated;
        } else if (this.role === 'admin') {
          this.adminIsAuthenticated = isAuthenticated;
        } else {
          this.userIsAuthenticated = isAuthenticated;
          this.adminIsAuthenticated = isAuthenticated;
        }
      });
  }

  onLogout() {
    this.role = null;
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
