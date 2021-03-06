import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ServerService } from '../../services/server.service';
import { UserInfo,OpeningInfo } from '../../interface';

@Component({
  selector: 'app-edit-requirement',
  templateUrl: './edit-requirement.component.html',
  styleUrls: ['./edit-requirement.component.scss']
})
export class EditRequirementComponent implements OnInit {
  userInfo: UserInfo = {};
  myJobs: OpeningInfo[] = [];
  
  constructor(private info: LoginService, private serverdata: ServerService) { }

  ngOnInit() {
    this.info.currentUserInformation.subscribe(data => {

      this.userInfo = JSON.parse(JSON.stringify(data));
      this.info.getOpenings(this.userInfo.email,"");
    });
    this.info.currentMyJobs.subscribe(data => {
      if(data) this.myJobs = JSON.parse(JSON.stringify(data));
    });
  }

  public deleteRequirement(index){
    this.serverdata.deleteRequirement(index).subscribe(data =>{
      if(data == "1"){
        for(let i=0;i<this.myJobs.length;i++){
          if(this.myJobs[i].ind.toString() == index.toString()){
            this.myJobs.splice(i, 1);
            this.info.deletedJobID.next(index.toString());
            return;
          }
        }
      }

    }, error => {
      console.log("Error in deleteRequirement:", JSON.stringify(error));
    });
  }

  public shareJobInfo(ind){
      var win = window.open("#/job/"+ind, '_blank');
      win.focus();
  }

  public editRequirement(job){
    this.info.editRequirement(job);
  }

}
