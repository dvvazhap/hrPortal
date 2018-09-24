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
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';

import { AppComponent } from './app.component';
import { ServerService } from './services/server.service';
import { LoginService } from './services/login.service';



import { ReusableModule } from './reusable/reusable.module';

const appRoutes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginModule' },
  { path: 'verifyUser', loadChildren: './verify/verify.module#VerifyModule'},
  { path: 'resetPassword', loadChildren: './reset-password/reset-password.module#ResetPasswordModule' },
  {
    path: 'employer',
    loadChildren: './employer/employer.module#EmployerModule'
  },
  {
    path: 'employee', 
    loadChildren: './employee/employee.module#EmployeeModule'
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
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TooltipModule.forRoot(),
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
