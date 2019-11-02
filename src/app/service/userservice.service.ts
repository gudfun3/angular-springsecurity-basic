import { Injectable } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { User } from '../models/User';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private router:Router,private http:HttpClient ) { }

  createUser(user:User){
    return this.http.post(Constants.HOME_URL+'/createUser',user)
  }
}
