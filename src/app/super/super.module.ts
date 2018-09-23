import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { ReusableModule } from './../reusable/reusable.module';

import { SuperComponent } from './../super/super.component';

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
    ReusableModule,
    RouterModule.forChild(superRoutes)
  ],
  declarations: [SuperComponent]
})
export class SuperModule { }
