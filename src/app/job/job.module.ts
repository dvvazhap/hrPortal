import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { JobComponent } from './job.component';

const jobRoutes: Routes = [
  {
    path: '',
    component: JobComponent
  }, {
    path: ':id',
    component: JobComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(jobRoutes)
  ],
  declarations: [JobComponent]
})
export class JobModule { }
