import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { Subject } from 'rxjs';
import { UserInfo, EmployeeInfo, EmployerInfo, OpeningInfo } from '../interface';

@Injectable()
export class LoginService {
  private userInformationSource = new Subject<UserInfo>();
  currentUserInformation = this.userInformationSource.asObservable();

  private employeeInformationSource = new Subject<EmployeeInfo>();
  currentEmployeeInformation = this.employeeInformationSource.asObservable();

  private employerInformationSource = new Subject<EmployerInfo>();
  currentEmployerInformation = this.employerInformationSource.asObservable();

  private myJobsSource = new Subject<OpeningInfo[]>();
  currentMyJobs = this.myJobsSource.asObservable();

  private editJobSource = new Subject<OpeningInfo>();
  currentEditingJob = this.editJobSource.asObservable();

  private selectComponent = new Subject<string>();
  currentComponent = this.selectComponent.asObservable();

  user: UserInfo;
  employee: EmployeeInfo = {} as EmployeeInfo;
  employer: EmployerInfo = {} as EmployerInfo;

  stoData: {
    t: string;
    e: string;
    ut: string;
  };
  candidates: any[];

  constructor(private router: Router, private serverdata: ServerService) { }

  public setStorageInfo(token, email, user_type) {
    const obj = { t: token, e: email, ut: user_type };
    localStorage.setItem('dijiluser', JSON.stringify(obj));
  }

  public getStorageInfo() {
    if (localStorage.getItem('dijiluser')) {
      this.stoData = JSON.parse(localStorage.getItem('dijiluser'));
      if (this.stoData.ut == "1")
        this.router.navigate(['employer/' + this.stoData.e]);
      else if (this.stoData.ut == "2")
        this.router.navigate(['employee/' + this.stoData.e]);
      else if (this.stoData.ut == "3")
        this.router.navigate(['super/' + this.stoData.e]);
    }
  }

  public trustedUser(id, type) {
    if (!localStorage.getItem('dijiluser')) { this.router.navigate(['/']); return false; }
    this.stoData = JSON.parse(localStorage.getItem('dijiluser'));

    if (this.stoData.t.toLowerCase().indexOf(id.toLowerCase()) != -1) {
      this.serverdata.getUserInfo(id, this.stoData.t, type).subscribe(dat => {
        if (dat == '') { this.router.navigate(['/']); return false; }
        this.user = JSON.parse(dat);
        this.user.user_type = type;
        this.userInformationSource.next(this.user);
      },
        error => {
          this.router.navigate(['/']);
        }
      );
    } else { this.router.navigate(['/']); }
  }

  public selectedComponent(option: string) { this.selectComponent.next(option); }

  public updateUserInformation(id, type) {
    this.serverdata.getUserInfo(id, this.stoData.t, type).subscribe(dat => {
      if (dat == '') { this.router.navigate(['/']); return false; }
      this.user = JSON.parse(dat);
      this.userInformationSource.next(this.user);
    },
      error => {
        this.router.navigate(['/']);
      }
    );
  }


  public getEmployerInfo(email) {
    this.serverdata.getEmployerInfo(email).subscribe(dat => {
      this.employer = JSON.parse(dat);
      this.employerInformationSource.next(this.employer);
    },
      error => {
        console.log("error getEmployerInfo:", error)
      }
    );
  }

  public getEmployeeInfo(email) {
    this.serverdata.getEmployeeInfo(email).subscribe(dat => {
      if(dat) this.employee = JSON.parse(dat);
      this.employeeInformationSource.next(this.employee);
    },
      error => {
        console.log("error getEmployeeInfo:", error)
      }
    );
  }

  public getOpenings(email,ind) {
    this.serverdata.getOpenings(email,ind).subscribe(data => {

      let myJobs = JSON.parse(data);
      this.myJobsSource.next(myJobs);

    }, error => {
      console.log("Error in getOpenings: email :"+email+" ind :"+ind, JSON.stringify(error));
    });
  }

  public editRequirement(job) {
    this.editJobSource.next(job);
  }

  public getToken() {
    return localStorage.getItem('dijiluser') ? JSON.parse(localStorage.getItem('dijiluser')).t : "";
  }
  public logOut() {
    localStorage.removeItem('dijiluser');
    this.router.navigate(['/']);
  }
}
