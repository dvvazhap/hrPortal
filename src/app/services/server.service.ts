import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: HttpClient) {
    // this.http.get('/assets/config.json').toPromise().then(
    //   response => {
    //     console.log("this.host subs:", response.valueOf()['host']);
    //     this.host = response.valueOf()['host'];
    //   })
  }

  host:string = "http://ec2-35-154-125-171.ap-south-1.compute.amazonaws.com:3003/";
  // host:string = "http://localhost:3003/";

  validateEmail(email) {
    return this.http.get(this.host + "validateUser?email=" + email, { responseType: 'text' });
  }
  verifyUser(tok, code, email) {
    let body = new HttpParams().set(`email`, email).set(`token`, tok).set(`code`, code);
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "verifyUser", body.toString(), { headers, observe: 'response', responseType: 'text' }).pipe(map(res => { return res.body; }));
  }

  resendEmail(email) {
    let body = new HttpParams().set(`email`, email);
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "resendEmail", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  resetPasswordLink(email) {
    let body = new HttpParams().set(`email`, email);
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "resetPasswordLink", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }
  resetPassword(email, code, password, phone) {
    let body = new HttpParams().set(`email`, email).set(`code`, code).set(`password`, password);

    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "resetPassword", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }
  checkUser(email, password) {
    let body = new HttpParams().set(`email`, email).set(`password`, password);
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "checkUser", body.toString(), { headers, observe: 'response', responseType: 'text' });
  }

  addUser(token, email, password, user_type, name) {
    user_type == true ? user_type = 1 : user_type = 2;

    let body = new HttpParams()
      .set(`token`, token + email)
      .set(`email`, email)
      .set(`password`, password)
      .set(`user_type`, user_type)
      .set(`name`, name);

    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "addUser", body.toString(), { headers, observe: 'response', responseType: 'text' });
  }

  getUserInfo(email, token, user_type) {
    console.log("host :",this.host);
    const body = new HttpParams()
      .set(`email`, email)
      .set(`token`, token)
      .set(`user_type`, user_type);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "getUserInfo", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  setEmployerInfo(name, designation, org_name, city, phone, email) {
    const body = new HttpParams()
      .set(`name`, name)
      .set(`designation`, designation)
      .set(`org_name`, org_name)
      .set(`city`, city)
      .set(`phone`, phone)
      .set(`email`, email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "setEmployerInfo", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  changePassword(token, old_password, new_password) {
    const body = new HttpParams()
      .set(`token`, token)
      .set(`old_password`, old_password)
      .set(`new_password`, new_password);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "changePassword", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  postRequirements(obj) {
    let dat = JSON.stringify(obj);
    const body = new HttpParams().set(`obj`, dat);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "postRequirements", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  getEmployeeInfo(email) {
    let dat = JSON.stringify(email);
    const body = new HttpParams().set(`email`, email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "getEmployeeInfo", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  setEmployeeInfo(obj, email) {
    let dat = JSON.stringify(obj);
    const body = new HttpParams().set(`obj`, dat).set(`email`, email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "setEmployeeInfo", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  addEducation(email) {
    const body = new HttpParams().set(`email`, email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "addEducation", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }
  getEducation(email) {
    const body = new HttpParams().set(`email`, email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "getEducation", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }
  updateEducation(education) {
    const body = new HttpParams().set(`email`, education.email).set(`ind`, education.ind).set(`college`, education.college).set(`degree`, education.degree)
      .set(`stream`, education.stream).set(`start`, education.start).set(`end`, education.end).set(`cgpa`, education.cgpa).set(`percentage`, education.percentage);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "updateEducation", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }
  deleteEducation(email, ind) {
    const body = new HttpParams().set(`email`, email).set(`ind`, ind);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "deleteEducation", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  addWork(email) {
    const body = new HttpParams().set(`email`, email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "addWork", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }
  getWork(email) {
    const body = new HttpParams().set(`email`, email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "getWork", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }
  updateWork(work) {
    const body = new HttpParams().set(`email`, work.email).set(`ind`, work.ind).set(`company`, work.company).set(`description`, work.description).set(`start`, work.start).set(`end`, work.end).set(`present`, work.present);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "updateWork", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }
  deleteWork(email, ind) {
    const body = new HttpParams().set(`email`, email).set(`ind`, ind);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "deleteWork", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  addProject(email) {
    const body = new HttpParams().set(`email`, email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "addProject", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }
  getProject(email) {
    const body = new HttpParams().set(`email`, email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "getProject", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }
  updateProject(proj) {
    const body = new HttpParams().set(`email`, proj.email).set(`ind`, proj.ind).set(`name`, proj.name).set(`description`, proj.description).set(`skills`, proj.skills).set(`start`, proj.start).set(`end`, proj.end);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "updateProject", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }
  deleteProject(email, ind) {
    const body = new HttpParams().set(`email`, email).set(`ind`, ind);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "deleteProject", body.toString(), { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  getEmployerInfo(email) {
    // let dat = JSON.stringify(obj);
    const body = new HttpParams().set(`email`, email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "getEmployerInfo", body, { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  getCandidates(org_name) {
    // let dat = JSON.stringify(obj);
    const body = new HttpParams().set(`org_name`, org_name);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "getCandidates", body, { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  getOpenings(email, ind) {
    const body = new HttpParams().set(`email`, email).set(`ind`, ind);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "getOpenings", body, { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  submitFeedback(email, subject, profile) {
    // let dat = JSON.stringify(obj);
    const body = new HttpParams().set(`email`, email).set(`subject`, subject).set(`profile`, profile);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "submitFeedback", body, { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  deleteRequirement(job_id) {
    const body = new HttpParams().set(`job_id`, job_id);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "deleteRequirement", body, { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }


  updateRequirement(obj) {
    let dat = JSON.stringify(obj);
    const body = new HttpParams().set(`obj`, dat);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "updateRequirement", body, { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  incrementProfileView(email) {
    const body = new HttpParams().set(`email`, email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "incrementProfileView", body, { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }
  incrementJobView(ind) {
    const body = new HttpParams().set(`ind`, ind);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "incrementJobView", body, { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  getSuperTables(table, email) {
    const body = new HttpParams().set(`tableName`, table).set(`email`, email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "getSuperTables", body, { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }

  getSuperSql(sql) {
    const body = new HttpParams().set(`sql`, sql);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.host + "getSuperSql", body, { headers, observe: 'response', responseType: 'text' })
      .pipe(map(res => { return res.body; }));
  }



}
