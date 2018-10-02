import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { PipeModule } from './../reusable/pipe/pipe.module';

import { SuperComponent } from './super.component';


const superRoutes: Routes = [
  {
    path: '',
    component: SuperComponent
  }, {
    path: ':id',
    component: SuperComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipeModule,
    RouterModule.forChild(superRoutes)
  ],
  declarations: [SuperComponent]
})
export class SuperModule { }
