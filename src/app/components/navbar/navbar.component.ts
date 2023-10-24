import { Component } from '@angular/core';
import {AuthService} from "@app/src/app/services/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService) {
  }

  isAccessToAnalyticsAllowed() {
    return this.authService.isAccessToAnalyticsAllowed();
  }

  isAccessToAdminPanelAllowed() {
    return this.authService.isAccessToAdminPanelAllowed();
  }

  logout() {
    this.authService.logout();
  }
}
