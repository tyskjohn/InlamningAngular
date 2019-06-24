import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.css']
})
export class ProfileOverviewComponent implements OnInit {

  constructor(private authService: AuthService) { }

  public user = {};

  ngOnInit() {

    this.authService.getUser()
      .subscribe(data => this.user = data);

  }

}
