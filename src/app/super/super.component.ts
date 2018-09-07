import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../services/server.service';

import { UserInfo, EmployerInfo, EmployeeInfo,OpeningInfo, Feedback } from '../interface';

@Component({
  selector: 'app-super',
  templateUrl: './super.component.html',
  styleUrls: ['./super.component.css']
})
export class SuperComponent implements OnInit {

  users: UserInfo[];
  feedback: Feedback[];
  employerinfo: EmployerInfo[];
  openings: OpeningInfo[];
  skills: EmployeeInfo[];
  email: string = "";
  id: string;
  sql = "";
  sqlResponse: string = "Response";

  constructor(private route: ActivatedRoute, private info: LoginService, private serverdata: ServerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.info.trustedUser(this.id, 3);
    })
  }

  public getSuperTables(table, email) {
    this.serverdata.getSuperTables(table, email).subscribe(data => {
      switch (table) {
        case "users":
          this.users = JSON.parse(data) as UserInfo[];
          break;
        case "feedback":
          this.feedback = JSON.parse(data) as Feedback[];
          break;
        case "employerinfo":
          this.employerinfo = JSON.parse(data) as EmployerInfo[];
          break;
        case "openings":
          this.openings = JSON.parse(data) as OpeningInfo[];
          break;
        case "skills":
          this.skills = JSON.parse(data) as EmployeeInfo[];
      }

    }, error => {
      console.log("Error in getSuperTables:", JSON.stringify(error));
    })
  }

  public executeSQL() {
    this.serverdata.getSuperSql(this.sql).subscribe(data => {
      this.sqlResponse = data;
    }, error => {
      this.sqlResponse = JSON.stringify(error);
    })
  }

  public clearSQL() {
    this.sql = "";
    this.sqlResponse = "Response";
  }


  public getInfo() {
    this.getSuperTables("users", this.email);
    this.getSuperTables("feedback", this.email);
    this.getSuperTables("employerinfo", this.email);
    this.getSuperTables("openings", this.email);
    this.getSuperTables("skills", this.email);
  }

  public clearInfo() {
    this.users = [] as UserInfo[];
    this.feedback = [] as Feedback[];
    this.openings = [] as OpeningInfo[];
    this.employerinfo = [] as EmployerInfo[];
    this.skills = [] as EmployeeInfo[];
    
  }

  public shareProfile(profile) {
    var win = window.open("#/profile/" + profile, '_blank');
    win.focus();
  }

  public shareJob(job) {
    var win = window.open("#/job/" + job, '_blank');
    win.focus();
  }
  
  public logout(){
    this.info.logOut();
  }
}
