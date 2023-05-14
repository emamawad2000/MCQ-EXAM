import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
     LoginComponent,
     RegisterComponent,
    // NewExamComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
  ],
  exports:[
    LoginComponent
  ]
})
export class AuthModule { }





