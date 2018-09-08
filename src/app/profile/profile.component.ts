import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserInfo } from '../interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: UserInfo = {} as UserInfo;
  constructor(private info: LoginService) { }
  ngOnInit() {
    this.info.currentUserInformation.subscribe(data => {
      this.userInfo = JSON.parse(JSON.stringify(data));
    });
  }
}
