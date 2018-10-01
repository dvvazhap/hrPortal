import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServerService } from '../services/server.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  tt: string;
  rr: number;
  email: string;
  error:string;
  info:string;
  constructor(private route: ActivatedRoute, private router: Router, private serverdata: ServerService, private login_info: LoginService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.tt = params['t'];
      this.rr = params['r'];
      this.verifyUser(this.tt, this.rr);
    })
  }

  public verifyUser = function (tt: string, rr: number) {
    this.email = tt.substring(13);
    this.serverdata.verifyUser(tt, rr, this.email).subscribe(data => {
      let temp = JSON.parse(data);
      if (temp.stat === "verified") {
        this.error = "";
        this.info = "User already verified.";
      }
      else if (temp.stat === "0") {
        this.info = "";
        this.error = "Email Verification Unsuccessful.";
      }
      else if (temp.stat === "1") {
        this.error = "";
        this.info = "Email Verification Successful."
      }
      this.login_info.setStorageInfo(temp.t, this.email, temp.ut);
      if (temp.ut == "1")
        this.router.navigate(['employer/' + this.email]);
      else if (temp.ut == "2")
        this.router.navigate(['employee/' + this.email]);
      else if (temp.ut == "3")
        this.router.navigate(['super/' + this.email]);
    }, error => {
      this.info = "";
      this.error = "Could not verify due to some issues.";
    });

  }

  public login() {
    this.router.navigate(['/']);
  }

}
