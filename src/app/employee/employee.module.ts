import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { EmployeeComponent } from './employee.component';
import { JobOpeningsComponent } from './job-openings/job-openings.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';

import { LogoModule } from './../reusable/logo/logo.module';
import { HeaderModule } from './../reusable/header/header.module';
import { FeedbackModule } from './../reusable/feedback/feedback.module';
import { SettingsModule } from './../reusable/settings/settings.module';
import { FooterModule } from './../reusable/footer/footer.module';


const employeeRoutes: Routes = [{
  path: '',
  component: EmployeeComponent
}, {
  path: ':id',
  component: EmployeeComponent
}]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
    LogoModule,
    HeaderModule,
    FooterModule,
    FeedbackModule,
    SettingsModule,
    RouterModule.forChild(employeeRoutes)
  ],
  declarations: [EmployeeComponent,JobOpeningsComponent,EmployeeProfileComponent]
})
export class EmployeeModule { }
