import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService, private authService: AuthService) { }

  public user = {};

  ngOnInit() {
    this.authService
    .getUser()
    .subscribe(data => this.user = data)
  }

  isLoggedIn: boolean = this.cookieService.check('isLoggedIn');
  
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl("/");
  }
}
