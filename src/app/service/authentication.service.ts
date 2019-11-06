import { Injectable } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../constants';
import { Cookie } from '../../../node_modules/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticated=false;
  constructor(private router:Router,private http:HttpClient) { }
 /*  authenticate(username,password){

   if(username==='Ashu' && password==='ashu@123'){
      sessionStorage.setItem('username',username);
      return true;
    }else{
      return false;
    }
  }
  */
 authenticate(credentials){

  const httpOptions = {
  headers:  new HttpHeaders({
  Authorization: 'Basic ' + btoa(credentials.username+':'+credentials.password),
  'Content-type' : 'application/x-www-form-urlencoded; charset=utf-8' } )
};

  return this.http.get(Constants.HOME_URL+'login',httpOptions);
 }

 isUserLoggedIn() : boolean{
  if (!Cookie.check('access_token')){
      return false
  }else{
    return true
  }
}



  // isUserLoggedIn(){
  //   let user=sessionStorage.getItem('username');
  //   console.log(!(user===null));
  //   return !(user===null);
  // }

  logOut(){
    sessionStorage.removeItem('username');
    this.router.navigate(['login']);
  }
}
