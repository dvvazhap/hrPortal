import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  currentTime: number = Date.now();
  emailExists: string = '';
  loading: boolean = false;
  email: string = '';
  error: string = '';
  msg: string = '';
  getSignInData: boolean = false;
  getPassword: boolean = false;
  passwordType: string = "password";
  resendVerifyEmail: boolean = false;

  token: string;
  password: string = '';
  confirm_password: string = '';
  name: string = '';
  user_type: boolean = true;

  constructor(private serverdata: ServerService, private info: LoginService, private router: Router) { }

  ngOnInit() {
    this.info.getStorageInfo();

  }
  private validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  public validateEmail() {
    if (!this.validEmail(this.email)) {
      this.error = "Enter a valid Email Address";
    } else {
      this.error = '';
      this.loading = true;
      this.serverdata.validateEmail(this.email).subscribe(data => {
        this.emailExists = data.toString();
        if (this.emailExists == "nodata") {
          this.getSignInData = true;
          this.loading = false;
          this.msg = "Create your account in 30 seconds";
        } else if (this.emailExists == "not_valid") {
          this.getPassword = false;
          this.error = "Verify your account by clicking on the email you have received.";
          this.loading = false;
          this.resendVerifyEmail = true;
        }
        else if (this.emailExists == "valid") {
          this.getPassword = true;
          this.loading = false;
        }
      }, error => {
        this.loading = false;
        this.error = "Server is down. Sorry for the inconvenience.";
      });
    }
  }

  public showPassword() { this.passwordType = "text"; }
  public hidePassword() { this.passwordType = "password"; }
  public resetPassword() {

    this.serverdata.resetPasswordLink(this.email).subscribe(data => {
      this.error = "";
      if (data == "1") {
        this.error = "";
        this.msg = "Password reset link has been send to your mail id.";
      }
      else { //this should never come
        this.msg = "";
        this.error = "Could not update the reset link due to some issues.";
      }
    }, error => {
      this.msg = ""
      this.error = "Error :" + JSON.stringify(error);
    });
  }

  public logIn() {
    let password = Md5.hashStr(this.password).toString();
    this.serverdata.checkUser(this.email, password)
      .subscribe(data => {
        this.error = "";
        this.msg = "";
        let dat = JSON.parse(data.body)
        if (dat.count == 0) {
          this.error = "Password does not match."
        }
        else {
          this.info.setStorageInfo(dat.token, this.email, dat.user_type);
          if (dat.user_type == "1")
            this.router.navigate(['employer/' + this.email]);
          else if (dat.user_type == "2")
            this.router.navigate(['employee/' + this.email]);
          else if (dat.user_type == "3")
            this.router.navigate(['super/' + this.email]);
        }
      }, error => {
        this.loading = false;
        this.error = "Server is down. Sorry for the inconvenience.";
      });
  }
  public resendEmail() {
    this.serverdata.resendEmail(this.email)
      .subscribe(data => {
        if (data == "send") {
          this.error = "";
          this.msg = "Verification email has been sent";
          this.resendVerifyEmail = false;
        } else {
          this.error = data;
          this.msg = "";
        }
      }, error => {
        this.loading = false;
        this.error = "Error :", JSON.stringify(error);
      });
  }
  public signUp() {
    if(this.name.replace(/\s/g,'').length == 0 ){
      this.error = 'Name cannot be empty';
      this.msg = '';
    }
    else if(this.name.replace(/\s/g,'').length < 3 ){
      this.error = 'Name cannot be that small';
      this.msg = '';
    }
    else if (this.password.replace(/\s/g,'').length < 8) {
      this.error = 'Password should be of minimum 8 characters';
      this.msg = '';
    }
    else if (this.password != this.confirm_password) {
      this.error = 'Password and Confirm Password should be same';
      this.msg = '';
    } else {
      this.error = '';
      this.msg = '';
      this.token = Date.now().toString();
      let password = Md5.hashStr(this.password).toString();
      this.getSignInData = false;
      this.serverdata.addUser(this.token, this.email, password, this.user_type,this.name)
        .subscribe(data => {

          this.resendVerifyEmail = true;
          this.msg = "Verify your account by clicking on the email you have received.";

        }, error => {
          this.loading = false;
          this.error = "Something went wrong.";
        });
    }

  }
}
