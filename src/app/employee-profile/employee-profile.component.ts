import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ServerService } from '../services/server.service';
import { ActivatedRoute } from '@angular/router';
import { UserInfo, EmployeeInfo, Projects, WorkExperience, Education } from '../interface';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
  id: string;
  error: string = "";
  msg: string = "All the fields with * are mandatory";
  userInfo: UserInfo = {} as UserInfo;
  employee: EmployeeInfo = {
    name: "",
    email: "",
    phone: "",
    looking: 0,
    fullTime: 1,
    partTime: 0,
    intern: 0,
    designation: "",
    fut_location: "",
    experience: "",
    noticePeriod: "",
    skills: "",
    specificReq: "",
    gender: 'Male',
    viewers: 1,
    objective: "",
    languages: "",
    academic_ach: "",
    extra_curricular: "",
    certifications: "",
    hobbies: "",
    address: "",
    linkedin: "",
    education: [],
    work_experience: [],
    projects: []
  } as EmployeeInfo;

  // dropdownList = [];
  // selectedItems = [];
  // dropdownSettings = {};
  looking: boolean = false;
  fullTime: boolean = true;
  partTime: boolean = false;
  intern: boolean = false;

  constructor(private info: LoginService, private serverdata: ServerService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });


    this.info.currentUserInformation.subscribe(data => {
      this.userInfo = JSON.parse(JSON.stringify(data));
    });

    this.info.currentEmployeeInformation.subscribe(dat => {
      this.employee = JSON.parse(JSON.stringify(dat));
      // this.selectedItems = [];
      this.employee.looking == 1 ? this.looking = true : this.looking = false;
      if (this.employee.fullTime == 1) this.fullTime = true;
      if (this.employee.partTime == 1) this.partTime = true;
      if (this.employee.intern == 1) this.intern = true;
    });


    // this.dropdownList = [
    //   { "id": 1, "itemName": "Full Time" },
    //   { "id": 2, "itemName": "Part Time" },
    //   { "id": 3, "itemName": "Internship" },
    // ];

    // this.dropdownSettings = {
    //   singleSelection: false,
    //   text: "SELECT THE TYPE OF OPPORTUNITY YOU ARE INTERESTED IN",
    //   enableSearchFilter: false,
    //   enableCheckAll: false,
    //   classes: "myclass custom-class"
    // };

  }

  // public setJobType(obj) {
  //   if (obj == undefined) { return; }
  //   if (obj.id == 1) this.employee.fullTime = 1;
  //   else if (obj.id == 2) this.employee.partTime = 1;
  //   else if (obj.id == 3) this.employee.intern = 1;
  // }
  // public jobTypeSelection(obj) {
  //   this.employee.fullTime = 0;
  //   this.employee.partTime = 0;
  //   this.employee.intern = 0;
  //   this.setJobType(obj[0]);
  //   this.setJobType(obj[1]);
  //   this.setJobType(obj[2]);
  // }

  // public onItemSelect(item: any) { this.jobTypeSelection(this.selectedItems); }
  // public OnItemDeSelect(item: any) { this.jobTypeSelection(this.selectedItems); }

  public shareMyInfo(email) {
    var win = window.open("profile/" + email, '_blank');
    win.focus();
  }

  public workPresent(work) {
    let tod = new Date();
    let a = tod.getFullYear() + '-';
    if (tod.getMonth() < 9) {
      a += '0' + (tod.getMonth() + 1);
    } else {
      a += tod.getMonth() + 1;
    }
    work.end = a;
  }

  public addEducation() {

    this.serverdata.addEducation(this.userInfo.email).subscribe(data => {

      let obj = {
        email: this.userInfo.email,
        ind: parseInt(data),
        cgpa: "",
        percentage: "",
        college: "",
        degree: "",
        stream: "",
        start: "",
        end: ""
      } as Education;
      this.employee.education.push(obj);
    });
  }

  public updateEducation(education) {
    return this.serverdata.updateEducation(education)
      .subscribe(data => {
      }, error => {
        this.error += "Error :" + JSON.stringify(error);
      }
      )
  }

  public deleteEducation(ind) {
    this.serverdata.deleteEducation(this.userInfo.email, ind).subscribe(data => {
      let a = -1;
      for (let i = 0; i < this.employee.education.length; i++) {
        if (this.employee.education[i].ind == ind) {
          a = i;
          break;
        }
      }
      this.employee.education.splice(a, 1);
    });
  }

  public addWork() {
    this.serverdata.addWork(this.userInfo.email).subscribe(data => {
      let obj = {
        email: this.userInfo.email,
        ind: parseInt(data),
        company: "",
        description: "",
        start: "",
        end: "",
        present: false
      } as WorkExperience
      this.employee.work_experience.push(obj);
    });
  }

  public updateWork(work) {
    return this.serverdata.updateWork(work)
      .subscribe(data => {
      }, error => {
        this.error += "Error :" + JSON.stringify(error);
      }
      )
  }

  public deleteWork(ind) {
    this.serverdata.deleteWork(this.userInfo.email, ind).subscribe(data => {
      let a = -1;
      for (let i = 0; i < this.employee.work_experience.length; i++) {
        if (this.employee.work_experience[i].ind == ind) {
          a = i;
          break;
        }
      }
      this.employee.work_experience.splice(a, 1);
    });
  }

  public addProject() {
    this.serverdata.addProject(this.userInfo.email).subscribe(data => {
      let obj = {
        email: this.userInfo.email,
        ind: parseInt(data),
        name: "",
        description: "",
        skills: "",
        start: "",
        end: ""
      } as Projects
      this.employee.projects.push(obj);
    });
  }

  public updateProject(proj) {
    return this.serverdata.updateProject(proj)
      .subscribe(data => {
      }, error => {
        this.error += "Error :" + JSON.stringify(error);
      }
      )
  }

  public deleteProject(ind) {
    this.serverdata.deleteProject(this.userInfo.email, ind).subscribe(data => {
      let a = -1;
      for (let i = 0; i < this.employee.projects.length; i++) {
        if (this.employee.projects[i].ind == ind) {
          a = i;
          break;
        }
      }
      this.employee.projects.splice(a, 1);
    });
  }
  public validate() {
    this.error = "";
    this.msg = "";
    console.log("this.employee :",this.employee);
    if(this.employee.experience == "" || isNaN(parseFloat(this.employee.experience))) this.employee.experience = "0";
    let experience = parseFloat(this.employee.experience);
    this.employee.experience = (isNaN(parseFloat(this.employee.experience)) ? "0" : (parseFloat(this.employee.experience)).toString())

    if(this.employee.noticePeriod == "" || isNaN(parseFloat(this.employee.noticePeriod))) this.employee.noticePeriod = "0";
    let noticePeriod = parseFloat(this.employee.noticePeriod);
    this.employee.noticePeriod = (isNaN(parseFloat(this.employee.noticePeriod)) ? "0" : (parseFloat(this.employee.noticePeriod)).toString())


    if (this.looking == false) {
      return true;
    }
    else if (!(this.fullTime || this.partTime || this.intern)) {
      this.error = "Select the type of opportunity you are interested in"; return false;
    }
    else if (this.employee.name == "" || this.employee.name == null) {
      this.error = "NAME field cannot be empty"; return false;
    }
    else if (this.employee.designation == "" || this.employee.designation == null) {
      this.error = "DESIGNATION field cannot be empty"; return false;
    }
    else if (this.employee.fut_location == "" || this.employee.fut_location == null) {
      this.error = "Enter the interested location(s) for the new job"; return false;
    }

    if (this.employee.education.length > 0) {
      for (let i = 0; i < this.employee.education.length; i++) {
        let startYear = parseInt(this.employee.education[i].start.substring(0, 4));
        let startMonth = parseInt(this.employee.education[i].start.substring(5));
        let endYear = parseInt(this.employee.education[i].end.substring(0, 4));
        let endMonth = parseInt(this.employee.education[i].end.substring(5));
        if(this.employee.education[i].cgpa == "" || isNaN(parseFloat(this.employee.education[i].cgpa))) this.employee.education[i].cgpa = "0";
        let cgpa = parseFloat(this.employee.education[i].cgpa);
        this.employee.education[i].cgpa = (isNaN(parseFloat(this.employee.education[i].cgpa)) ? "0" : (parseFloat(this.employee.education[i].cgpa)).toString())

        if(this.employee.education[i].percentage == "" || isNaN(parseFloat(this.employee.education[i].percentage))) this.employee.education[i].percentage = "0";
        let percentage = parseFloat(this.employee.education[i].percentage);
        this.employee.education[i].percentage = (isNaN(parseFloat(this.employee.education[i].percentage)) ? "0" : (parseFloat(this.employee.education[i].percentage)).toString())


        if (this.employee.education[i].college == "" || this.employee.education[i].college == null) {
          this.error = "Education: COLLEGE field cannot be empty"; return false;
        }
        else if (this.employee.education[i].degree == "" || this.employee.education[i].degree == null) {
          this.error = "Education: DEGREE field cannot be empty"; return false;
        }
        else if (this.employee.education[i].stream == "" || this.employee.education[i].stream == null) {
          this.error = "Education: STREAM field cannot be empty"; return false;
        }
        else if (this.employee.education[i].start == "" || this.employee.education[i].start == null || this.employee.education[i].end == "" || this.employee.education[i].end == null) {
          this.error = "Education: FROM and TO fields cannot be empty"; return false;
        }
        else if (startYear < 1930 || startYear > 2030 || startMonth < 1 || startMonth > 12 || this.employee.education[i].start.substring(5).length != 2 || this.employee.education[i].start.substring(4, 5) != "-") {
          this.error = "Education: FROM field is not valid"; return false;
        }
        else if (endYear < 1930 || endYear > 2030 || endMonth < 1 || endMonth > 12 || this.employee.education[i].end.substring(5).length != 2 || this.employee.education[i].end.substring(4, 5) != "-") {
          this.error = "Education: TO field is not valid"; return false;
        }
        else if ((startYear * 100 + startMonth) >= (endYear * 100 + endMonth)) {
          this.error = "Education: FROM date should be less than TO date"; return false;
        }
        else if (cgpa < 0 || cgpa > 10 || isNaN(cgpa)) {
          this.error = "Education: CGPA field is not valid (0-10)"; return false;
        }
        else if (percentage < 0 || percentage > 100 || isNaN(percentage)) {
          this.error = "Education: PERCENTAGE field is not valid (0-100)"; return false;
        }

      }
    }
    if (this.employee.work_experience.length > 0) {

      for (let i = 0; i < this.employee.work_experience.length; i++) {
        let startYear = parseInt(this.employee.work_experience[i].start.substring(0, 4));
        let startMonth = parseInt(this.employee.work_experience[i].start.substring(5));
        let endYear = parseInt(this.employee.work_experience[i].end.substring(0, 4));
        let endMonth = parseInt(this.employee.work_experience[i].end.substring(5));

        if (this.employee.work_experience[i].company == "" || this.employee.work_experience[i].company == null) {
          this.error = "WORK EXPERIENCE: COMPANY field cannot be empty"; return false;
        }
        else if (this.employee.work_experience[i].start == "" || this.employee.work_experience[i].start == null || this.employee.work_experience[i].end == "" || this.employee.work_experience[i].end == null) {
          this.error = "WORK EXPERIENCE: FROM and TO fields cannot be empty"; return false;
        }
        else if (startYear < 1930 || startYear > 2030 || startMonth < 1 || startMonth > 12 || this.employee.work_experience[i].start.substring(5).length != 2 || this.employee.work_experience[i].start.substring(4, 5) != "-") {
          this.error = "WORK EXPERIENCE: FROM field is not valid"; return false;
        }
        else if (endYear < 1930 || endYear > 2030 || endMonth < 1 || endMonth > 12 || this.employee.work_experience[i].end.substring(5).length != 2 || this.employee.work_experience[i].end.substring(4, 5) != "-") {
          this.error = "WORK EXPERIENCE: TO field is not valid"; return false;
        }
        else if ((startYear * 100 + startMonth) >= (endYear * 100 + endMonth)) {
          this.error = "WORK EXPERIENCE: FROM date should be less than TO date"; return false;
        }
      }
    }
    if (this.employee.projects.length > 0) {

      for (let i = 0; i < this.employee.projects.length; i++) {
        let startYear = parseInt(this.employee.projects[i].start.substring(0, 4));
        let startMonth = parseInt(this.employee.projects[i].start.substring(5));
        let endYear = parseInt(this.employee.projects[i].end.substring(0, 4));
        let endMonth = parseInt(this.employee.projects[i].end.substring(5));

        if (this.employee.projects[i].name == "" || this.employee.projects[i].name == null) {
          this.error = "PROJECTS: NAME field cannot be empty"; return false;
        }
        else if (this.employee.projects[i].start == "" || this.employee.projects[i].start == null || this.employee.projects[i].end == "" || this.employee.projects[i].end == null) {
          this.error = "PROJECTS: FROM and TO fields cannot be empty"; return false;
        }
        else if (startYear < 1930 || startYear > 2030 || startMonth < 1 || startMonth > 12 || this.employee.projects[i].start.substring(5).length != 2 || this.employee.projects[i].start.substring(4, 5) != "-") {
          this.error = "PROJECTS: FROM field is not valid"; return false;
        }
        else if (endYear < 1930 || endYear > 2030 || endMonth < 1 || endMonth > 12 || this.employee.projects[i].end.substring(5).length != 2 || this.employee.projects[i].end.substring(4, 5) != "-") {
          this.error = "PROJECTS: TO field is not valid"; return false;
        }
        else if ((startYear * 100 + startMonth) >= (endYear * 100 + endMonth)) {
          this.error = "PROJECTS: FROM date should be less than TO date"; return false;
        }
      }
    }

    if (experience < 0 || experience > 70 || isNaN(experience)) {
      this.error = "EXPERIENCE should be a valid number between 0 and 70";
      return false;
    }
    else if (noticePeriod < 0 || noticePeriod > 365 || isNaN(noticePeriod)) {
      this.error = "NOTICE PERIOD should be a valid number between 0 and 365";
      return false;
    }
    else if (this.employee.skills == "" || this.employee.skills == null) {
      this.error = "AREA OF EXPERTISE should not be empty";
      return false;
    }

    return true;
  }

  public setEmployeeInfo() {
    if (this.validate()) {
      this.msg = "";
      this.error = "";
      this.looking == true ? this.employee.looking = 1 : this.employee.looking = 0;
      this.fullTime == true ? this.employee.fullTime = 1 : this.employee.fullTime = 0;
      this.partTime == true ? this.employee.partTime = 1 : this.employee.partTime = 0;
      this.intern == true ? this.employee.intern = 1 : this.employee.intern = 0;  

      this.serverdata.setEmployeeInfo(JSON.parse(JSON.stringify(this.employee)), this.userInfo.email).subscribe(data => {
        for (let i = 0; i < this.employee.education.length; i++) {
          this.updateEducation(this.employee.education[i]);
        }
        for (let j = 0; j < this.employee.work_experience.length; j++) {
          this.updateWork(this.employee.work_experience[j]);
        }
        for (let k = 0; k < this.employee.projects.length; k++) {
          this.updateProject(this.employee.projects[k]);
        }
        this.msg = "Updated your Resume Successfully";
      }, error => {
        this.error = "Error :" + JSON.stringify(error);
      });
    }
  }
}
