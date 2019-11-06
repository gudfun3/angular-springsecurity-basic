import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '../../../node_modules/@angular/router';
import { MatSnackBar } from '../../../node_modules/@angular/material';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Constants } from '../constants';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authenticated=false;
  credentials={username:'',password:''};
  invalidLogin=false;
  constructor(private router:Router,private http:HttpClient,private loginService:AuthenticationService, private _snackBar:MatSnackBar) { }

  ngOnInit() {
  }

   login(){
  //   this.loginService.authenticate(this.credentials).subscribe(res=>{
  //     console.log(res);
  //     if(res){
  //     Cookie.set('username',this.credentials.username);
  //     Cookie.set('password',this.credentials.password);
  //     this.authenticated = true;
  //     this.router.navigateByUrl("/");
      
  //     //sending get request to /user to get user details once the user is logged in
      
    
  //     this.openSnackBar("Welcome"+this.credentials.username,"done");
    
  //     const headers = new HttpHeaders(this.credentials ? {
  //       authorization : 'Basic ' + btoa(this.credentials.username + ':' + this.credentials.password)
  //   } : {});

  //     this.http.get(Constants.HOME_URL + 'user', {headers: headers}).subscribe(response => {
  //       if (response['username']) {
  //           this.authenticated = true;
  //           Cookie.set("credentials", JSON.stringify(response))
  //       } else {
  //           this.authenticated = false;
  //       } });
      
  //   }else{
  //     this.authenticated=false;
  //     this.router.navigateByUrl("/login");
  //   }
    
  //  })
   
  this.loginService.authenticate(this.credentials).subscribe(res => {
    console.log(this.authenticated);

    if(res){

      this.router.navigateByUrl('/');
      this.authenticated=true;
      /*
      * Make sure you have configured the header correctly even a space or spelling mistake
      * in header will result in 401 unauthorized error and wont allow to access 
      */
      const httpOptions = {
        headers:  new HttpHeaders({
        Authorization: 'Basic ' + btoa(this.credentials.username+':'+this.credentials.password),
        'Content-type' : 'application/x-www-form-urlencoded; charset=utf-8' } )
      };
      console.log(JSON.stringify(httpOptions));
      
      this.http.get(Constants.HOME_URL+'user',httpOptions).subscribe(response => {
        if (response['username']) {
            this.authenticated = true;
            Cookie.set("credentials", JSON.stringify(this.credentials))
        } else {
            this.authenticated = false;
        }
        this.saveToken(response);
      },
      error => {
        if(error.status == 401){
            this.authenticated = false;
            //console.log("Your session has expired. Please login again...");
        }
      }
      );
   
    }
    else{
      this.router.navigateByUrl("/login");
      this.authenticated=false;
      // $(".error-message").fadeIn("slow");
      // setTimeout(function(){
      //   $(".error-message").fadeOut("slow");
      // }, 5000)
    }
});
  
  

  }


  saveToken(token){
    var expireDate = new Date().getTime();
    let date = new Date(expireDate);
  
    Cookie.set("access_token", JSON.stringify(token), 4/24);
    this.router.navigate(['/']);
  }


  getToken(): any{
    return Cookie.get("access_token");
  }


  signUp(){
    this.router.navigate(['/signup'])
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['success-snackbar'],
        horizontalPosition: 'end',
        verticalPosition: 'top' 
    });
  }

  checkLogin(){
    if(this.loginService.isUserLoggedIn()){
      this.router.navigate(['']);
    this.invalidLogin=false;
    }else{
      this.invalidLogin=true;
    }
  }
}
