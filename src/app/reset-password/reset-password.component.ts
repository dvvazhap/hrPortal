import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServerService } from '../services/server.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  ee: string;
  rr: number;
  password: string;
  confirm_password: string;
  error = '';
  msg = '';

  constructor(private route: ActivatedRoute, private router: Router, private serverdata: ServerService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.ee = params['e'];
      this.rr = params['r'];

      alert("params :"+params)
    })
  }

  public resetPassword = function () {
    alert("inside resetPAssword..................................")
    if (this.password.length < 8) {
      this.error = 'Password should be of minimum 8 characters';
      this.msg = '';
    }
    else if (this.password != this.confirm_password) {
      this.error = 'Password and Confirm Password should be same';
      this.msg = '';
    } else {
      this.error = '';
      this.msg = '';
      let password = Md5.hashStr(this.password).toString();

      this.serverdata.resetPassword(this.ee, this.rr, password).subscribe(data => {
        alert("data :"+data + this);
        if (data == "mismatch") {
          alert("Invalid link. Click on Forgot password to reset again.");
          this.router.navigate(['/']);
        }
        else if (data == "0") {
          this.msg = "";
          this.password = "";
          this.confirm_password = "";
          this.error = "Reset Password Unsuccessful.";
        }
        else if (data == "1") {
          this.error = "";
          this.password = "";
          this.confirm_password = "";
          window.alert("Reset Password Successful");
          this.router.navigate(['/']);
        }
      }, error => {
        this.msg = "";
        this.error = "Could not verify due to some issues.Please report this issue";
      });
    }

  }

  public login() {
    this.router.navigate(['/']);
  }

}
