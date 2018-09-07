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
  id: string;
  employee: EmployeeInfo = {} as EmployeeInfo;

  constructor(private route: ActivatedRoute, private info: LoginService, private serverdata: ServerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.info.getEmployeeInfo(this.id);
    });

    this.info.currentEmployeeInformation.subscribe(dat => { this.employee = dat; })

  }

}
