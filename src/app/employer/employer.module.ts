import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { EmployerComponent } from './employer.component';
import { PostRequirementComponent } from './post-requirement/post-requirement.component';
import { FindCandidatesComponent } from './find-candidates/find-candidates.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { EditRequirementComponent } from './edit-requirement/edit-requirement.component';

import { ReusableModule } from './../reusable/reusable.module';

const employerRoutes: Routes = [{
  path: '',
  component: EmployerComponent
}, {
  path: ':id',
  component: EmployerComponent
}]


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReusableModule,
    AngularMultiSelectModule,
    RouterModule.forChild(employerRoutes)
  ],
  declarations: [EmployerComponent,PostRequirementComponent,FindCandidatesComponent,EmployerProfileComponent,EditRequirementComponent]
})
export class EmployerModule { }
