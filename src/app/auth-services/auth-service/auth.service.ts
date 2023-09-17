import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { StorageService } from '../storage-service/storage.service';

const BASIC_URL = ['http://localhost:8080/']
export const AUTH_HEADER = "authorization";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private storage:StorageService) { }
  signup(signupRequest:any):Observable<any>{
    return this.http.post(BASIC_URL+"signup",signupRequest);
  }
  login(email:string,password:string):Observable<any>{
    return this.http.post(BASIC_URL+"authentication",{
      email,
      password
    },
    {observe : 'response'}) // used to same the token in http local strorage 
    .pipe(
      tap((__: any) => this.log("User Authentication")),
      map((res: HttpResponse<any>) =>{
        this.storage.saveUser(res.body);
        const tokenLengthtemp = res.headers.get(AUTH_HEADER);
        if(tokenLengthtemp!=null){
          const tokenLength = tokenLengthtemp.length;
          const bearerToken = tokenLengthtemp.substring(7,tokenLength); // remiving bearer from the token
          this.storage.saveToken(bearerToken);
          return res;
        }
        else{
          console.log("token is null, please generate a valid jwt token");
          return null;
        }
        
      })
    );
  }

  log(message:string): void{
    console.log("User Auth Servive "+ message);
  }
}
