import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _apiurl: string = "http://localhost:3001/api";

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public getUserId = localStorage.getItem("USER_ID");

  public authToken = localStorage.getItem('ACCESS_TOKEN');
   
  public getUser(): Observable<User[]> {
    let getToken = localStorage.getItem('ACCESS_TOKEN');
    let userId = localStorage.getItem('USER_ID');
    return this.http.get<User[]>(`${this._apiurl}/angularUsers/${userId}`, { headers: { 'Authorization': `Bearer ${getToken}` } } );
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
    let getToken = localStorage.getItem('ACCESS_TOKEN');
    let userId = localStorage.getItem('USER_ID');
    return this.http.put(`${this._apiurl}/angularUsers/${userId}`, userInfo, { headers: { 'Authorization': `Bearer ${getToken}` } } );
  }

}
