import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ServerService } from '../services/server.service';
import { UserInfo } from '../interface';

@Component({
  selector: 'app-post-requirement',
  templateUrl: './post-requirement.component.html',
  styleUrls: ['./post-requirement.component.css']
})
export class PostRequirementComponent implements OnInit {
  userInfo: UserInfo = {} as any;
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
    noticePeriod: 0
  } as any;

  // obj: any = {};

  constructor(private info: LoginService, private serverdata: ServerService) { }

  ngOnInit() {
    this.dropdownList = [
      { "id": 1, "itemName": "Full Time" },
      { "id": 2, "itemName": "Part Time" },
      { "id": 3, "itemName": "Internship" },
    ];
    this.selectedItems = [
      { "id": 1, "itemName": "Full Time" }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select the Type of Job",
      enableSearchFilter: false,
      enableCheckAll: false,
      classes: "myclass custom-class"
    };

    this.info.currentUserInformation.subscribe(data => {
      this.userInfo = JSON.parse(JSON.stringify(data));
    });

    this.info.currentEditingJob.subscribe(data => {

      this.requirement = JSON.parse(JSON.stringify(data));
      this.error = "";
      this.msg = "All the fields with * are mandatory";
      window.scrollTo(0, document.body.scrollHeight);

      this.selectedItems = [];
      if (this.requirement.ind == 0) {
        this.selectedItems.push({ "id": 1, "itemName": "Full Time" });
      } else {
        if (this.requirement.fullTime == 1) this.selectedItems.push({ "id": 1, "itemName": "Full Time" });
        if (this.requirement.partTime == 1) this.selectedItems.push({ "id": 2, "itemName": "Part Time" });
        if (this.requirement.intern == 1) this.selectedItems.push({ "id": 3, "itemName": "Internship" });
      }

    });

    this.info.editRequirement(this.requirement);
  }

  public setJobType(obj) {
    if (obj == undefined) { return; }
    if (obj.id == 1) this.requirement.fullTime = 1;
    else if (obj.id == 2) this.requirement.partTime = 1;
    else if (obj.id == 3) this.requirement.intern = 1;
  }
  public jobTypeSelection(obj) {
    this.requirement.fullTime = 0;
    this.requirement.partTime = 0;
    this.requirement.intern = 0;

    this.setJobType(obj[0]);
    this.setJobType(obj[1]);
    this.setJobType(obj[2]);

  }

  public onItemSelect(item: any) { this.jobTypeSelection(this.selectedItems); }
  public OnItemDeSelect(item: any) { this.jobTypeSelection(this.selectedItems); }

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
      noticePeriod: 0
    }
    this.info.editRequirement(this.requirement);
  }

  public validate() {
    this.error = "";
    this.msg = "";
    let v_contact = new RegExp(/^[+]?[\d]+$/).test(this.requirement.contact);

    let v_exp = parseFloat(this.requirement.min_years.toString()) <= parseFloat(this.requirement.max_years.toString());

    if (!(this.requirement.fullTime || this.requirement.partTime || this.requirement.intern)) {
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
    else if (!v_contact) {
      this.error = "Contact number is not valid(+XXXXXXXXXXXX)"; return false;
    }
    else if (!v_exp) {
      this.error = "Min Exp should be less than Max Exp"; return false;
    }
    else if (!(this.requirement.noticePeriod >= 0 && this.requirement.noticePeriod <= 365)) {
      this.error = "Notice period should be a valid number between 0 and 365"; return false;
    }
    else if (this.requirement.skills == "") {
      this.error = "Enter the skills to do the job"; return false;
    }
    return true;
  }

  public postRequirement() {
    if (this.validate()) {

      this.requirement.email = this.userInfo.email;
      this.requirement.min_years = Math.abs(Math.round(this.requirement.min_years * 10) / 10);
      this.requirement.max_years = Math.abs(Math.round(this.requirement.max_years * 10) / 10);
      this.requirement.noticePeriod = Math.abs(this.requirement.noticePeriod);
      this.serverdata.postRequirements(JSON.parse(JSON.stringify(this.requirement))).subscribe(data => {
        if (data == "1") {
          this.error = "";
          this.msg = "Requirement posted";

          this.addRequirement();
          this.info.jobsPostedByMe();
        }
        else if (data == "0") {
          this.error = "Something went wrong";
          this.msg = "";

          this.info.jobsPostedByMe();
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
      this.requirement.noticePeriod = Math.abs(this.requirement.noticePeriod);
      this.serverdata.updateRequirement(JSON.parse(JSON.stringify(this.requirement))).subscribe(data => {
        if (data == "1") {
          this.error = "";
          this.msg = "Requirement saved";
          this.info.jobsPostedByMe();
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
