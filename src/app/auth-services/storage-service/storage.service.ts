import { Injectable } from '@angular/core';
import { retryWhen } from 'rxjs';

const TOKEN = 'c_token';
const USER = 'c_user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static hasToken(): boolean {
    if(this.getToken()==null){
      return false;
    }
    return true;
  }

  public saveUser(user:any){
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }

  public saveToken(token:string){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }

  static getToken(): string {
    const token = localStorage.getItem(TOKEN);
    return token!;
  }
  static getUser(): any {
    console.log(localStorage.getItem(USER));
    return JSON.parse(localStorage.getItem(USER) || '');
  }
  static getUserId(): string {
    const user = this.getUser();
    console.log(user)
    if(user==null){return '';}
    return user.userId;
  }
  static isUserLoggedIn(){
    if(this.getToken() == null){
      return false;
    }
    return true;
  }
  static logout(){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
