import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ServerService } from '../services/server.service';
import { UserInfo, EmployeeInfo } from '../interface';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  error: string = "";
  msg: string = "All the fields with * are mandatory";
  userInfo: UserInfo = {} as any;
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

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  looking: boolean = false;

  constructor(private info: LoginService, private serverdata: ServerService) { }

  ngOnInit() {
    this.info.currentUserInformation.subscribe(data => {
      this.userInfo = JSON.parse(JSON.stringify(data));
    });

    this.info.currentEmployeeInformation.subscribe(dat => {
      this.employee = JSON.parse(JSON.stringify(dat));
      this.employee.looking == 1 ? this.looking = true : this.looking = false;
      if (this.employee.fullTime == 1) this.selectedItems.push({ "id": 1, "itemName": "Full Time" });
      if (this.employee.partTime == 1) this.selectedItems.push({ "id": 2, "itemName": "Part Time" });
      if (this.employee.intern == 1) this.selectedItems.push({ "id": 3, "itemName": "Internship" });
    });


    this.dropdownList = [
      { "id": 1, "itemName": "Full Time" },
      { "id": 2, "itemName": "Part Time" },
      { "id": 3, "itemName": "Internship" },
    ];
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select the Type of Job",
      enableSearchFilter: false,
      enableCheckAll: false,
      classes: "myclass custom-class"
    };

  }

  public setJobType(obj) {
    if (obj == undefined) { return; }
    if (obj.id == 1) this.employee.fullTime = 1;
    else if (obj.id == 2) this.employee.partTime = 1;
    else if (obj.id == 3) this.employee.intern = 1;
  }
  public jobTypeSelection(obj) {
    this.employee.fullTime = 0;
    this.employee.partTime = 0;
    this.employee.intern = 0;
    this.setJobType(obj[0]);
    this.setJobType(obj[1]);
    this.setJobType(obj[2]);
  }

  public onItemSelect(item: any) { this.jobTypeSelection(this.selectedItems); }
  public OnItemDeSelect(item: any) { this.jobTypeSelection(this.selectedItems); }

  public shareMyInfo(email){
    var win = window.open("#/profile/"+email, '_blank');
      win.focus();
  }
  public validate() {
    this.error = "";
    this.msg = "";
    let v_contact = new RegExp(/^[+]?[\d]+$/).test(this.employee.phone);
    if (this.looking == false) {
      return true;
    }

    else if (this.employee.name == "" || this.employee.name == null) {
      this.error = "Enter your name"; return false;
    }
    else if (!v_contact) {
      this.error = "Contact number is not valid(+XXXXXXXXXXXX)"; return false;
    }
    else if (!(this.employee.fullTime || this.employee.partTime || this.employee.intern)) {
      this.error = "Select the type(s) of Job"; return false;
    }
    else if (this.employee.designation == "" || this.employee.designation == null) {
      this.error = "Enter your current designation"; return false;
    }
    else if (this.employee.company == "" || this.employee.company == null) {
      this.error = "Enter the current company working for"; return false;
    }
    else if (this.employee.cur_location == "" || this.employee.cur_location == null) {
      this.error = "Enter your current location"; return false;
    }
    else if (this.employee.fut_location == "" || this.employee.fut_location == null) {
      this.error = "Enter the interested location(s) for the new job"; return false;
    }
    else if (!(this.employee.experience >= 0 && this.employee.experience <= 70)) {
      this.error = "Experience should be a valid number between 0 and 70"; return false;
    }
    else if (!(this.employee.noticePeriod >= 0 && this.employee.noticePeriod <= 365)) {
      this.error = "Notice period should be a valid number between 0 and 365"; return false;
    }
    else if (this.employee.degree == "" || this.employee.degree == null) {
      this.error = "Enter the highest degree you acquired"; return false;
    }
    else if (this.employee.stream == "" || this.employee.stream == null) {
      this.error = "Enter the stream your pursued"; return false;
    }
    else if (this.employee.institution == "" || this.employee.institution == null) {
      this.error = "Enter the institution you graduated from"; return false;
    }
    else if (!(this.employee.passout >= 1950 && this.employee.passout <= 2030)) {
      this.error = "Enter the year of passout(1950-2030)"; return false;
    }
    else if (this.employee.skills == "" || this.employee.skills == null) {
      this.error = "Enter your area of expertise"; return false;
    }
    return true;
  }

  public setEmployeeInfo() {
    if (this.validate()) {
      this.looking == true ? this.employee.looking = 1 : this.employee.looking = 0;
      this.serverdata.setEmployeeInfo(JSON.parse(JSON.stringify(this.employee)), this.userInfo.email).subscribe(data => {
        if (data == "1") {
          this.error = "";
          this.msg = "Saved your skills";
        }
        else if (data == "0") {
          this.error = "There was no info to be updated";
          this.msg = "";
        }
      }, error => {
        this.msg = ""
        this.error = "Error :" + JSON.stringify(error);
      }
      );
    }
  }

}
