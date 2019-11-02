import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  userName="";
  constructor(private loginService:AuthenticationService) { }

  ngOnInit() {
    this.userName=sessionStorage.getItem('username');
  }
 logout(){
   this.loginService.logOut();
 }
}
