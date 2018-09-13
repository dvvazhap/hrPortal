import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { LoginService } from '../services/login.service';
import { EmployeeInfo, UserInfo } from '../interface';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  id: string;
  token: string;
  user: UserInfo;
  callComponent: string = "";
  employee: EmployeeInfo;

  constructor(private route: ActivatedRoute, private router: Router, private serverdata: ServerService, private info: LoginService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.info.trustedUser(this.id, 2);
      this.info.getEmployeeInfo(this.id);
      this.callComponent = 'profile';
    })

    this.info.currentUserInformation.subscribe(data => { this.user = data; })
    this.info.currentComponent.subscribe(dat => { this.callComponent = dat; })
    this.info.currentEmployeeInformation.subscribe(dat => { this.employee = dat; })
  }

}
