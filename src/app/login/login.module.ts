import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LogoModule } from './../reusable/logo/logo.module';

import { LoginComponent } from './login.component';

const loginRoutes: Routes = [{
    path: '',
    component: LoginComponent
  }]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFontAwesomeModule,
    LogoModule,
    RouterModule.forChild(loginRoutes)
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
