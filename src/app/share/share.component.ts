import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ServerService } from '../services/server.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeInfo } from '../interface';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  error: string = "";
  msg: string = "All the fields with * are mandatory";

  id: string;
  employee: EmployeeInfo = {
    name: "",
    phone: "",
    looking: 0,
    fullTime: 1,
    partTime: 0,
    intern: 0,
    designation: "",
    company: "",
    cur_location: "",
    fut_location: "",
    experience: 0,
    noticePeriod: 0,
    degree: "",
    stream: "",
    institution: "",
    passout: 2018,
    skills: "",
    specificReq: ""
  } as any;

  constructor(private route: ActivatedRoute, private info: LoginService, private serverdata: ServerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.info.getEmployeeInfo(this.id);
    });

    this.info.currentEmployeeInformation.subscribe(dat => { this.employee = dat; })

  }

}
