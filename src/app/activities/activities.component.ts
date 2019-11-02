import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  username:String;
  constructor() { }

  ngOnInit() {
    this.username=sessionStorage.getItem('username');
  }

}
