import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _apiurl: string = "http://localhost:3001/api";

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public getUserId = localStorage.getItem("USER_ID");

  public authToken() {
    return localStorage.getItem('ACCESS_TOKEN')
  } 

  public getUser(): Observable<User[]> {

    return this.http.get<User[]>(`${this._apiurl}/angularUsers/${this.getUserId}`);
    
  }

  public login(userInfo: User) {
    return this.http.post(`${this._apiurl}/angularUsers/login`, userInfo);
  }

  public register(userInfo: User) {
    return this.http.post(`${this._apiurl}/angularUsers/register`, userInfo);
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('USER_EMAIL');
    this.cookieService.deleteAll();
  }

  public updateUserInfo(userInfo: User) {
    return this.http.put(`${this._apiurl}/angularUsers/${this.getUserId}`, userInfo);
  }

}
