import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ServerService } from '../../services/server.service';
import { Md5 } from 'ts-md5/dist/md5';
import { UserInfo, EmployeeInfo, EmployerInfo } from '../../interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  userInfo: UserInfo = {} as UserInfo;
  settings:any =  {
    old_password: "",
    new_password: "",
    confirm_password: ""
  } as any;

  password_error: string = "";
  password_msg: string = "";

  constructor(private info: LoginService, private serverdata: ServerService) { }

  ngOnInit() {
    this.info.currentUserInformation.subscribe(data => {
      this.userInfo = JSON.parse(JSON.stringify(data));
    });
  }

  public oldPassChange() {
    if (this.settings.old_password.replace(/\s/g, '').length === 0 ) { return true; } else { return false; }
  }
  public newPassChange() {
    if (this.settings.new_password.replace(/\s/g, '').length < 8) { return true; } else { return false }
  }
  public confPassChange() {
    if (this.settings.new_password !== this.settings.confirm_password) { return true; } else { return false; }
  }

  public disablePassChange() {
    if (this.settings.old_password.replace(/\s/g, '').length >0 && this.settings.new_password.replace(/\s/g, '').length >= 8 && 
    this.settings.new_password !== '' && this.settings.new_password === this.settings.confirm_password)
      return false;
    else return true;
  }

  public changePassord() {
    if (this.settings.new_password.length < 8) {
      this.password_error = 'Password should be of minimum 8 characters.';
      this.password_msg = '';
    }
    else if (this.settings.new_password != this.settings.confirm_password) {
      this.password_error = "'Password' and 'Confirm Password' should be same.";
      this.password_msg = '';
    }
    else if (this.settings.new_password == this.settings.old_password) {
      this.password_error = "'Old password' and 'New password' is same.";
      this.password_msg = '';
    }
    else {
      this.password_error = '';
      this.password_msg = '';
      //alert("sign In :"+this.email+this.phone+this.password+this.confirm_password+this.type);
      let token = this.info.getToken()
      let old_password = Md5.hashStr(this.settings.old_password).toString();
      let new_password = Md5.hashStr(this.settings.new_password).toString();

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
