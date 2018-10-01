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
  user: any = {
    loading: false,
    token: "",

    email: '',
    emailExists: '',
    name: '',
    password: "",
    confirm_password: '',
    user_type: 0,
    currentTime: Date.now(),
    error: '',
    msg: '',
    getSignInData: false,
    getPassword: false,
    resendVerifyEmail: false,
  };

  constructor(private serverdata: ServerService, private info: LoginService, private router: Router) { }

  ngOnInit() {
    this.info.getStorageInfo();

  }
  validEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.user.email).toLowerCase());
  }

  validateThisUser() {
    this.user.error = '';
    this.user.loading = true;
    this.serverdata.validateEmail(this.user.email).subscribe(data => {
      this.user.emailExists = data.toString();
      if (this.user.emailExists == "nodata") {
        this.user.getSignInData = true;
        this.user.loading = false;
        this.user.msg = "Create your account in 30 seconds";
      } else if (this.user.emailExists == "not_valid") {
        this.user.getPassword = false;
        this.user.error = "Verify your account by clicking on the email you have received.";
        this.user.loading = false;
        this.user.resendVerifyEmail = true;
      }
      else if (this.user.emailExists == "valid") {
        this.user.getPassword = true;
        this.user.loading = false;
      }
    }, error => {
      this.user.loading = false;
      this.user.error = "Server is down. Sorry for the inconvenience.";
    });
  }

  public resetPassword() {

    this.serverdata.resetPasswordLink(this.user.email).subscribe(data => {
      this.user.error = "";
      if (data == "1") {
        this.user.error = "";
        this.user.msg = "Password reset link has been send to your mail id.";
      }
      else { //this should never come
        this.user.msg = "";
        this.user.error = "Could not update the reset link due to some issues.";
      }
    }, error => {
      this.user.msg = ""
      this.user.error = "Error :" + JSON.stringify(error);
    });
  }

  public logIn() {
    let password = Md5.hashStr(this.user.password).toString();
    this.serverdata.checkUser(this.user.email, password)
      .subscribe(data => {
        this.user.error = "";
        this.user.msg = "";
        let dat = JSON.parse(data.body)
        if (dat.count == 0) {
          this.user.error = "Password does not match."
        }
        else {
          this.info.setStorageInfo(dat.token, this.user.email, dat.user_type);
          if (dat.user_type == "1")
            this.router.navigate(['employer/' + this.user.email]);
          else if (dat.user_type == "2")
            this.router.navigate(['employee/' + this.user.email]);
          else if (dat.user_type == "3")
            this.router.navigate(['super/' + this.user.email]);
        }
      }, error => {
        this.user.loading = false;
        this.user.error = "Server is down. Sorry for the inconvenience.";
      });
  }
  public resendEmail() {
    this.serverdata.resendEmail(this.user.email)
      .subscribe(data => {
        if (data == "send") {
          this.user.error = "";
          this.user.msg = "Verification email has been sent";
          this.user.resendVerifyEmail = false;
        } else {
          this.user.error = data;
          this.user.msg = "";
        }
      }, error => {
        this.user.loading = false;
        this.user.error = "Error :", JSON.stringify(error);
      });
  }

  public nameChange() {
    if (this.user.name.replace(/\s/g, '').length < 3) { return true; } else { return false; }
  }
  public passChange() {
    if (this.user.password.replace(/\s/g, '').length < 8) { return true; } else { return false }
  }
  public confPassChange() {
    if (this.user.password !== this.user.confirm_password) { return true; } else { return false; }
  }

  public selUserType(){
    if (this.user.user_type ==0 ){ return true;} else{ return false;}
  }

  public disableSignUp() {
    if (this.user.name.replace(/\s/g, '').length >= 3 && this.user.password.replace(/\s/g, '').length >= 8 && this.user.password !== '' && this.user.password === this.user.confirm_password && this.user.user_type!==0)
      return false;
    else return true;
  }

  public signUp() {
    console.log("insdie sign up :this.user.name ", this.user.name, "...this.user.password :", this.user.password, "...this.user.confirm_password :", this.user.confirm_password);
    this.user.error = "";
    this.user.msg = "";
    this.user.token = Date.now().toString();
    let password = Md5.hashStr(this.user.password).toString();
    this.user.getSignInData = false;
    this.serverdata.addUser(this.user.token, this.user.email, password, this.user.user_type, this.user.name)
      .subscribe(data => {
        this.user.resendVerifyEmail = true;
        this.user.msg = "Verify your account by clicking on the email you have received.";
      }, error => {
        this.user.loading = false;
        this.user.error = "Something went wrong.";
      });


  }
}
