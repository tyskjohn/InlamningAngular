import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  _apiurl: string = "http://localhost:3001/api";

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }

  updateForm: FormGroup;
  isSubmitted: boolean = false;

  public user = {};

  ngOnInit() {

    this.updateForm = this.formBuilder.group({
      firstname:        ['', Validators.required],
      lastname:         ['', Validators.required],
      middlename:       [''],
      dateofbirth:      ['', Validators.required],
      addressline:      ['', Validators.required],
      zipcode:          ['', Validators.required],
      city:             ['', Validators.required],
      country:          ['', Validators.required],
      addressline2:     [''],
      zipcode2:         [''],
      city2:            [''],
      country2:         [''],
      email:            ['', Validators.required],
      password:         ['', Validators.required]
    })

    this.authService
      .getUser()
      .subscribe(data => this.user = data)

    this.authService
      .getUser()
      .subscribe(data => this.updateForm.patchValue(data))

  }

  updateUserInfo() {
    this.isSubmitted = true;
    console.log("1")

    if (this.updateForm.invalid) {
      console.log("2")

      return;
    }
    console.log("3")

    this.authService.updateUserInfo(this.updateForm.value).subscribe((registerres) => {
      if (registerres["success"]) {
        this.router.navigateByUrl('/profile');
        window.alert("Profile updated successfully");
      } else {
        console.log("Fuck off")
      }
    })
  }

}
