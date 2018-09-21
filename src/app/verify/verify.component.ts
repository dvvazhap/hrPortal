import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServerService } from '../services/server.service';

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
  constructor(private route: ActivatedRoute, private router: Router, private serverdata: ServerService) { }

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
      // alert("data :"+data);
      if (data == "verified") {
        this.error = "";
        this.info = "User already verified.";
      }
      else if (data == "0") {
        this.info = "";
        this.error = "Email Verification Unsuccessful.";
      }
      else if (data == "1") {
        this.error = "";
        this.info = "Email Verification Successful."
      }
    }, error => {
      this.info = "";
      this.error = "Could not verify due to some issues.";
    });

  }

  public login() {
    this.router.navigate(['/']);
  }

}
