import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ServerService } from '../../services/server.service';
import { UserInfo } from '../../interface';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  error: string = "";
  msg: string = "";
  userInfo: UserInfo = {} as any;
  subject: string;
  enableSubmit: boolean = false;

  constructor(private info: LoginService, private serverdata: ServerService) { }

  ngOnInit() {
    this.info.currentUserInformation.subscribe(data => {
      this.userInfo = JSON.parse(JSON.stringify(data));
    });
  }

  public checkFeedback() {
    this.subject.replace(/\s/g, '') === '' ? this.enableSubmit = false : this.enableSubmit = true;
  }
  public submitFeedback() {
    this.serverdata.submitFeedback(this.userInfo.email, this.subject, this.userInfo.user_type).subscribe(data => {
      if (data == "insert") {
        this.error = "";
        this.msg = "Thank you for your valuable feedback.";
        this.subject = "";
      }
    }, error => {
      this.msg = ""
      this.error = "Error :" + JSON.stringify(error);
    });
  }
}
