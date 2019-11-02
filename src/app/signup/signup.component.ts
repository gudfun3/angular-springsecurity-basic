import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { MatSnackBar } from '../../../node_modules/@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { User } from '../models/User';
import { UserserviceService } from '../service/userservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  myForm:  FormGroup;
  submitted:boolean;
  events:any[]=[];
  user:User;

  /*
 * The `FormBuilder` provides syntactic sugar that shortens creating instances of a `FormControl`,
 * `FormGroup`, or `FormArray`. It reduces the amount of boilerplate needed to build complex
 * forms.
  */
  constructor(private _fb: FormBuilder,private router:Router,
    private loginService:AuthenticationService, private _snackBar:MatSnackBar,
  private userService:UserserviceService) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      phoneNumber : new FormControl('', [Validators.required,Validators.minLength(10)])
    })
}

  createUser(model: User, isValid: boolean){
    console.log("here on submission");
    
    if (this.myForm.invalid) {
      return;
  }
    // set form submit to true
    this.submitted=true;
    //check if form is valid
    // if valid call api to save the user
    this.userService.createUser(model).subscribe();
    this.router.navigate(['/login']);
    console.log(model,isValid);
  }
}
