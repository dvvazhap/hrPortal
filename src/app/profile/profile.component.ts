import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ServerService } from '../services/server.service';
import { Md5 } from 'ts-md5/dist/md5';
import { UserInfo, EmployeeInfo, EmployerInfo } from '../interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // error: string = "";
  // msg: string = "";
  userInfo: UserInfo = {} as any;
  employee: EmployeeInfo = {} as any;
  employer: EmployerInfo = {} as any;

  password_error: string = "";
  password_msg: string = "";
  old_password: string = "";
  new_password: string = "";
  confirm_password: string = "";

  constructor(private info: LoginService, private serverdata: ServerService) { }

  ngOnInit() {
    this.info.currentUserInformation.subscribe(data => {
      this.userInfo = JSON.parse(JSON.stringify(data));
    });
  }

  public changePassord() {
    if (this.new_password.length < 8) {
      this.password_error = 'Password should be of minimum 8 characters.';
      this.password_msg = '';
    }
    else if (this.new_password != this.confirm_password) {
      this.password_error = "'Password' and 'Confirm Password' should be same.";
      this.password_msg = '';
    }
    else if (this.new_password == this.old_password) {
      this.password_error = "'Old password' and 'New password' is same.";
      this.password_msg = '';
    }
    else {
      this.password_error = '';
      this.password_msg = '';
      //alert("sign In :"+this.email+this.phone+this.password+this.confirm_password+this.type);
      let token = this.info.getToken()
      let old_password = Md5.hashStr(this.old_password).toString();
      let new_password = Md5.hashStr(this.new_password).toString();

      this.serverdata.changePassword(token, old_password, new_password).subscribe(data => {
        if (data == "1") {
          this.password_error = "";
          this.password_msg = "Password changed.";
          this.info.updateUserInformation(this.userInfo.email, this.userInfo.user_type);
        }
        else if (data == "0") {
          this.password_msg = "";
          this.password_error = "Old password entered is wrong.";
        }
      }, error => {
        this.password_msg = ""
        this.password_error = "Error :" + JSON.stringify(error);
      });
    }
  }
}
