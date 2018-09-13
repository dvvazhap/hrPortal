import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ServerService } from '../services/server.service';
import { ActivatedRoute,Router } from '@angular/router';
import { EmployeeInfo } from '../interface';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  id: string;
  employee: EmployeeInfo = {
    education: [],
    work_experience: [],
    projects: []
  } as EmployeeInfo;

  constructor(private route: ActivatedRoute, private router: Router, private info: LoginService, private serverdata: ServerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id) this.info.getEmployeeInfo(this.id);
      else this.router.navigate(['/']);
    });

    this.info.currentEmployeeInformation.subscribe(dat => {this.employee = dat;})

  }
  @ViewChild('content') content: ElementRef;

  public downloadPdf() {
    let doc = new jsPDF();
    let specialElementhandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementhandlers
    });
    doc.save('test.pdf');
  }

}
