import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ServerService } from '../services/server.service';
import { UserInfo, EmployerInfo, EmployeeInfo } from '../interface';

@Component({
  selector: 'app-find-candidates',
  templateUrl: './find-candidates.component.html',
  styleUrls: ['./find-candidates.component.css']
})
export class FindCandidatesComponent implements OnInit {
  userInfo: UserInfo;
  candidates: EmployeeInfo[];
  employer: EmployerInfo;

  constructor(private info: LoginService, private serverdata: ServerService) { }

  ngOnInit() {
    this.info.currentUserInformation.subscribe(data => {
      this.userInfo = JSON.parse(JSON.stringify(data));

    });

    this.info.currentEmployerInformation.subscribe(dat => { this.employer = dat; 
      this.getCandidates();
    })


  }

  public getCandidates(){
    this.serverdata.getCandidates(this.employer.org_name).subscribe(data => {  
      this.candidates = JSON.parse(data);
    }, error => {
      console.log("Error in getCandidates:", JSON.stringify(error));
    })
  }

  public shareProfile(profile){
    var win = window.open("#/profile/"+profile, '_blank');
    win.focus();
  }
}


