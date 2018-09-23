import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ServerService } from '../services/server.service';
import { UserInfo, OpeningInfo } from '../interface';


@Component({
  selector: 'app-job-openings',
  templateUrl: './job-openings.component.html',
  styleUrls: ['./job-openings.component.scss']
})
export class JobOpeningsComponent implements OnInit {
  userInfo: UserInfo;
  openings: OpeningInfo[];

  constructor(private info: LoginService, private serverdata: ServerService) { }

  ngOnInit() {
    this.info.currentUserInformation.subscribe(data => {
      this.userInfo = JSON.parse(JSON.stringify(data));
    });
    this.getOpenings();
  }

  public getOpenings(){
    this.serverdata.getOpenings("","").subscribe(data => {
      this.openings = JSON.parse(data);
    })
  }

  public shareOpening(jobInfo){
    var win = window.open("#/job/"+jobInfo, '_blank');
    win.focus();
  }

}
