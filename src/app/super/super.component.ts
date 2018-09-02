import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../services/server.service';

import { UserInfo, EmployerInfo, CandidateInfo } from '../interface';

@Component({
  selector: 'app-super',
  templateUrl: './super.component.html',
  styleUrls: ['./super.component.css']
})
export class SuperComponent implements OnInit {

  users: any;
  feedback: any;
  employerinfo: any;
  openings: any;
  skills: any;
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
          this.users = JSON.parse(data);
          break;
        case "feedback":
          this.feedback = JSON.parse(data);
          break;
        case "employerinfo":
          this.employerinfo = JSON.parse(data);
          break;
        case "openings":
          this.openings = JSON.parse(data);
          break;
        case "skills":
          this.skills = JSON.parse(data);
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
    this.users.length = 0;
    this.feedback.length = 0;
    this.openings.length = 0;
    this.employerinfo.length = 0;
    this.skills.length = 0;
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
