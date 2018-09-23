import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UserInfo, EmployeeInfo, EmployerInfo } from '../../interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: UserInfo = {} as UserInfo;
  employee: EmployeeInfo = {
    education: [],
    work_experience: [],
    projects: []
  } as EmployeeInfo;
  employer: EmployerInfo = {} as EmployerInfo;

  constructor(private info: LoginService) { }

  ngOnInit() {
    this.info.currentUserInformation.subscribe(data => {
      this.user = data;
    });

    this.info.currentEmployerInformation.subscribe(dat => {
      this.employer = dat;
      if (this.employer.name == "" || this.employer.name == null) this.employer.name = "Guest User";
    });

    this.info.currentEmployeeInformation.subscribe(dat => {
      this.employee = dat;
      if (this.employee.name == "" || this.employee.name == null) this.employee.name = "Guest User";
    });

  }

  public callComponent(option: string) {
    this.info.selectedComponent(option);
  }

  public logOut() {
    this.info.logOut();
  }
}
