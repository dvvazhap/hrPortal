import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { ActivatedRoute } from '@angular/router';
import { OpeningInfo } from '../interface';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  id: string;
  valid: number;
  requirement: OpeningInfo = {} as OpeningInfo;
  constructor(private route: ActivatedRoute, private serverdata: ServerService) {}

  ngOnInit() {
    this.route.params.subscribe(params => { this.id = params['id']; });
    this.valid = 0;
    this.serverdata.getOpenings("",this.id).subscribe(data => {
      if(data !='0'){
        this.valid = 1;
        this.requirement = JSON.parse(data)[0];
      }
    })
  }
}
