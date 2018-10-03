import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { EmployerComponent } from './employer.component';
import { PostRequirementComponent } from './post-requirement/post-requirement.component';
import { FindCandidatesComponent } from './find-candidates/find-candidates.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { EditRequirementComponent } from './edit-requirement/edit-requirement.component';

import { LogoModule } from './../reusable/logo/logo.module';
import { HeaderModule } from './../reusable/header/header.module';
import { FeedbackModule } from './../reusable/feedback/feedback.module';
import { SettingsModule } from './../reusable/settings/settings.module';
import { FooterModule } from './../reusable/footer/footer.module';


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
    TooltipModule,
    FormsModule,
    LogoModule,
    HeaderModule,
    FooterModule,
    FeedbackModule,
    SettingsModule,
    AngularMultiSelectModule,
    RouterModule.forChild(employerRoutes)
  ],
  declarations: [EmployerComponent,PostRequirementComponent,FindCandidatesComponent,EmployerProfileComponent,EditRequirementComponent]
})
export class EmployerModule { }
