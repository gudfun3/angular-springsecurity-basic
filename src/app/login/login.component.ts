import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '../../../node_modules/@angular/router';
import { MatSnackBar } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authenticated=false;
  credentials={username:'',password:''};
  invalidLogin=false;
  constructor(private router:Router,private loginService:AuthenticationService, private _snackBar:MatSnackBar) { }

  ngOnInit() {
  }

  login(){
    this.loginService.authenticate(this.credentials).subscribe(res=>{
      console.log(res);
      if(res){
      sessionStorage.setItem('username',this.credentials.username);
      sessionStorage.setItem('password',this.credentials.password);
      this.authenticated = true;
      this.router.navigateByUrl("/");
      this.openSnackBar("Welcome"+this.credentials.username,"done");
    }else{
      this.authenticated=false;
      this.router.navigateByUrl("/login");
    }
    
   })
   
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
