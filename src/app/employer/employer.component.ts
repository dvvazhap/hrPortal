import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { LoginService } from '../services/login.service';
import { EmployerInfo, UserInfo } from '../interface';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {
  id: string;
  token: string;
  user: UserInfo;
  callComponent: string = "edit_requirement";
  employer: EmployerInfo;

  constructor(private route: ActivatedRoute, private router: Router, private serverdata: ServerService, private info: LoginService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.info.trustedUser(this.id, 1);
      this.info.getEmployerInfo(this.id);
    })

    this.info.currentUserInformation.subscribe(data => { this.user = data; })
    this.info.currentComponent.subscribe(dat => { this.callComponent = dat; })
    this.info.currentEmployerInformation.subscribe(dat => { this.employer = dat; })

  }
}
