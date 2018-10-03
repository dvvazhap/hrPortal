import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ServerService } from '../../services/server.service';
import { UserInfo, OpeningInfo } from '../../interface';

@Component({
  selector: 'app-post-requirement',
  templateUrl: './post-requirement.component.html',
  styleUrls: ['./post-requirement.component.scss']
})
export class PostRequirementComponent implements OnInit {
  userInfo: UserInfo = {} as UserInfo;
  error: string = "";
  msg: string = "All the fields with * are mandatory";
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

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
    description: "",
    gender: 'Anyone',
    count: 1
  } as OpeningInfo;

  fullTime: boolean = true;
  partTime: boolean = false;
  intern: boolean = false;
  constructor(private info: LoginService, private serverdata: ServerService) { }

  ngOnInit() {
    this.info.currentUserInformation.subscribe(data => {
      this.userInfo = JSON.parse(JSON.stringify(data));
    });

    this.info.deletedJID.subscribe(data => { if (data == this.requirement.ind.toString()) this.addRequirement(); });

    this.info.currentEditingJob.subscribe(data => {

      this.requirement = JSON.parse(JSON.stringify(data));
      if (this.requirement.fullTime == 1) this.fullTime = true;
      if (this.requirement.partTime == 1) this.partTime = true;
      if (this.requirement.intern == 1) this.intern = true;
      this.error = "";
      this.msg = "All the fields with * are mandatory";
      window.scrollTo(0, document.body.scrollHeight);
    });

    this.info.editRequirement(this.requirement);
  }

  public addRequirement() {
    this.requirement = {
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
      description: "",
      gender: 'Anyone',
      count: 1
    } as OpeningInfo
    this.fullTime = true;
    this.partTime = false;
    this.intern = false;
    this.info.editRequirement(this.requirement);
  }

  public validate() {
    this.error = "";
    this.msg = "";

    let v_exp = parseFloat(this.requirement.min_years.toString()) <= parseFloat(this.requirement.max_years.toString());

    if (!(this.fullTime || this.partTime || this.intern)) {
      this.error = "Select the type(s) of Job"; return false;
    }
    else if (this.requirement.designation == "") {
      this.error = "Enter the designation(s) that you are looking for"; return false;
    }
    else if (this.requirement.company == "") {
      this.error = "Enter the company that you represent"; return false;
    }
    else if (this.requirement.location == "") {
      this.error = "Enter the location(s) of the job"; return false;
    }
    else if (!(this.requirement.count > 0)) {
      this.error = "Enter a valid number of openings"; return false;
    }
    else if (!v_exp) {
      this.error = "Min Exp should be less than Max Exp"; return false;
    }
    else if (this.requirement.description == "") {
      this.error = "Enter the Job Description"; return false;
    }
    else if (this.requirement.skills == "") {
      this.error = "Enter the skills to do the job"; return false;
    }
    return true;
  }

  public postRequirement() {
    if (this.validate()) {
      this.requirement.timestamp = new Date().toDateString();
      this.requirement.email = this.userInfo.email;
      this.requirement.min_years = Math.abs(Math.round(this.requirement.min_years * 10) / 10);
      this.requirement.max_years = Math.abs(Math.round(this.requirement.max_years * 10) / 10);
      this.fullTime == true ? this.requirement.fullTime = 1 : this.requirement.fullTime = 0;
      this.partTime == true ? this.requirement.partTime = 1 : this.requirement.partTime = 0;
      this.intern == true ? this.requirement.intern = 1 : this.requirement.intern = 0;
      this.serverdata.postRequirements(JSON.parse(JSON.stringify(this.requirement))).subscribe(data => {
        if (data == "1") {
          this.error = "";
          this.msg = "Requirement posted";

          this.addRequirement();
          this.info.getOpenings(this.userInfo.email, "");
        }
        else if (data == "0") {
          this.error = "Something went wrong";
          this.msg = "";

          this.info.getOpenings(this.userInfo.email, "");
          this.addRequirement();
        }
      }, error => {
        this.msg = ""
        this.error = "Error :" + JSON.stringify(error);
      }

      );
    }
  }

  public updateRequirement() {
    if (this.validate()) {
      this.requirement.email = this.userInfo.email;
      this.requirement.min_years = Math.abs(Math.round(this.requirement.min_years * 10) / 10);
      this.requirement.max_years = Math.abs(Math.round(this.requirement.max_years * 10) / 10);
      this.fullTime == true ? this.requirement.fullTime = 1 : this.requirement.fullTime = 0;
      this.partTime == true ? this.requirement.partTime = 1 : this.requirement.partTime = 0;
      this.intern == true ? this.requirement.intern = 1 : this.requirement.intern = 0;
      this.serverdata.updateRequirement(JSON.parse(JSON.stringify(this.requirement))).subscribe(data => {
        if (data == "1") {
          this.error = "";
          this.msg = "Requirement saved";
          this.info.getOpenings(this.userInfo.email, "");
        }
        else if (data == "0") {
          this.error = "Something went wrong";
          this.msg = "";
          this.addRequirement();
        }
      }, error => {
        this.msg = ""
        this.error = "Error :" + JSON.stringify(error);
      }

      );
    }
  }


}
