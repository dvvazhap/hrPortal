import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Routes, RouterModule } from "@angular/router";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';

import { AppComponent } from './app.component';
import { ServerService } from './services/server.service';
import { LoginService } from './services/login.service';

import { EmployeeComponent } from './employee/employee.component';
import { JobOpeningsComponent } from './employee/job-openings/job-openings.component';
import { EmployeeProfileComponent } from './employee/employee-profile/employee-profile.component';

import { EmployerComponent } from './employer/employer.component';
import { PostRequirementComponent } from './/employer/post-requirement/post-requirement.component';
import { FindCandidatesComponent } from './employer/find-candidates/find-candidates.component';
import { EmployerProfileComponent } from './employer/employer-profile/employer-profile.component';
import { EditRequirementComponent } from './employer/edit-requirement/edit-requirement.component';

import { ReusableModule } from './reusable/reusable.module';

const appRoutes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginModule' },
  { path: 'verifyUser', loadChildren: './verify/verify.module#VerifyModule'},
  { path: 'resetPassword', loadChildren: './reset-password/reset-password.module#ResetPasswordModule' },
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
    loadChildren: './job/job.module#JobModule'
  },
  {
    path: 'super',
    loadChildren: './super/super.module#SuperModule'
  },
  { path: '**', redirectTo: '/' }
];


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeProfileComponent,
    JobOpeningsComponent,
    EmployerComponent,
    PostRequirementComponent,
    FindCandidatesComponent,
    EmployerProfileComponent,
    EditRequirementComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TooltipModule.forRoot(),
    AngularMultiSelectModule,
    ModalModule.forRoot(),
    HttpClientModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    DataTablesModule,
    ReusableModule
  ],
  providers: [ServerService, LoginService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  exports: [],
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
