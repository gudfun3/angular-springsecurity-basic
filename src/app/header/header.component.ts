import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  app:any;
  username:String;
  constructor(private loginService:AuthenticationService) {
    this.app=loginService;
   }

  ngOnInit() {
    this.username=sessionStorage.getItem('username');
  }

}
