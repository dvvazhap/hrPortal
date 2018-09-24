import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";

import { EmployeeComponent } from './employee.component';
import { JobOpeningsComponent } from './job-openings/job-openings.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';

import { ReusableModule } from './../reusable/reusable.module';

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
    ReusableModule,
    RouterModule.forChild(employeeRoutes)
  ],
  declarations: [EmployeeComponent,JobOpeningsComponent,EmployeeProfileComponent]
})
export class EmployeeModule { }
