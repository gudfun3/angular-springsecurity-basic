import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  username:String;
  constructor() { }

  ngOnInit() {
    this.username=sessionStorage.getItem('username');
  }

}
