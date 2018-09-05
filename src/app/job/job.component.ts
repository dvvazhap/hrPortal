import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ServerService } from '../services/server.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  id: string;
  requirement = {
    ind: 0,
    fullTime: 1,
    partTime: 0,
    intern: 0,
    designation: "",
    company: "",
    location: "",
    contact: "",
    min_years: 0,
    max_years: 0,
    skills: "",
    specificReq: "",
    noticePeriod: 0,
    gender: 'Anyone',
    count: 1
  } as any;
  constructor(private route: ActivatedRoute, private info: LoginService, private serverdata: ServerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => { this.id = params['id']; });

    this.serverdata.getOpeningsById(this.id).subscribe(data => {
      this.requirement = JSON.parse(data);
    })
  }
}
