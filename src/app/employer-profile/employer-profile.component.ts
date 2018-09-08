import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ServerService } from '../services/server.service';
import { UserInfo, EmployerInfo } from '../interface';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css']
})
export class EmployerProfileComponent implements OnInit {
  error: string = "";
  msg: string = "";
  userInfo: UserInfo = {} as UserInfo;
  employer: EmployerInfo = {} as EmployerInfo;

  constructor(private info: LoginService, private serverdata: ServerService) { }

  ngOnInit() {
    this.info.currentUserInformation.subscribe(data => {   this.userInfo = JSON.parse(JSON.stringify(data));});
    this.info.currentEmployerInformation.subscribe(dat => { this.employer = JSON.parse(JSON.stringify(dat));});
  }

  public setEmployerInfo() {
    
    this.serverdata.setEmployerInfo(this.employer.name, this.employer.designation, this.employer.org_name, this.employer.city, this.employer.phone, this.userInfo.email).subscribe(data => {
      if (data == "1") {
        this.error = "";
        this.msg = "Information saved.";
        this.info.getEmployerInfo(this.userInfo.email);
      }
      else if (data == "0") {
        this.msg = "";
        this.error = "No new information to save.";
      }
    }, error => {
      this.msg = ""
      this.error = "Error :" + JSON.stringify(error);
      console.log("Error in saving personal Info for employer:", JSON.stringify(error));
    });
  }

}
