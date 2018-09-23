import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Routes, RouterModule } from "@angular/router";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';

import { AppComponent } from './app.component';
import { ServerService } from './services/server.service';
import { LoginService } from './services/login.service';
import { LoginComponent } from './login/login.component';
import { EmployerComponent } from './employer/employer.component';
import { EmployeeComponent } from './employee/employee.component';
import { VerifyComponent } from './verify/verify.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HeaderComponent } from './header/header.component';
import { JobOpeningsComponent } from './employee/job-openings/job-openings.component';
import { PostRequirementComponent } from './/employer/post-requirement/post-requirement.component';
import { FindCandidatesComponent } from './employer/find-candidates/find-candidates.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { EmployeeProfileComponent } from './employee/employee-profile/employee-profile.component';
import { EmployerProfileComponent } from './employer/employer-profile/employer-profile.component';
import { EditRequirementComponent } from './employer/edit-requirement/edit-requirement.component';
import { JobComponent } from './job/job.component';
import { SuperComponent } from './super/super.component';
import { SettingsComponent } from './settings/settings.component';
import { AppPropertiesPipe } from './app-properties.pipe';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'verifyUser', component: VerifyComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  {
    path: 'employer',
    children: [
      {
        path: '',
        component: EmployerComponent
      }, {
        path: ':id',
        component: EmployerComponent
      }
    ]
  },
  {
    path: 'employee', children: [
      {
        path: '',
        component: EmployeeComponent
      }, {
        path: ':id',
        component: EmployeeComponent
      }
    ]
  },
  {
    path: 'profile',
    loadChildren: './share/share.module#ShareModule'
  },
  {
    path: 'job',
    children: [
      {
        path: '',
        component: JobComponent
      }, {
        path: ':id',
        component: JobComponent
      }
    ]
  },
  {
    path: 'super',
    children: [
      {
        path: '',
        component: SuperComponent
      }, {
        path: ':id',
        component: SuperComponent
      }
    ]
  },
  { path: '**', redirectTo: '/' }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployerComponent,
    EmployeeComponent,
    VerifyComponent,
    ResetPasswordComponent,
    HeaderComponent,
    JobOpeningsComponent,
    PostRequirementComponent,
    FindCandidatesComponent,
    FeedbackComponent,
    EmployeeProfileComponent,
    EmployerProfileComponent,
    EditRequirementComponent,
    JobComponent,
    SuperComponent,
    SettingsComponent,
    AppPropertiesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    AngularMultiSelectModule,
    ModalModule.forRoot(),
    HttpClientModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    DataTablesModule
  ],
  providers: [ServerService, LoginService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { 
  directives: [
    NgTableComponent,
    NgTableFilteringDirective,
    NgTableSortingDirective,
    NgTablePagingDirective
  ]
}
