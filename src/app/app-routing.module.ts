import { NgModule } from '@angular/core';
import { RouterModule, Routes, Resolve } from '@angular/router';
import { LoginAuthComponent } from './components/autentification/login-auth/login-auth.component';
import { MaterialTableComponent } from './components/material-table/material-table.component';
import { AuthServiceService } from './components/autentification/auth-service.service';
import { StudentInfoTableComponent } from './components/student-info-table/studentInfoTable.component';

const routes: Routes = [/*
  {path: 'login', component: LoginAuthComponent, data: {title: 'login'}},
  {path: '', component: LoginAuthComponent, canActivateChild: [LoginAuthComponent],
    children: [
      { path: 'students', component: MaterialTableComponent, data: {title: 'students', role: ['STUDENT']}},
      { path: 'ONEStudent', component: StudentInfoTableComponent},
    ]
   }*/

  { path: 'login', component: LoginAuthComponent },
  { path: '',  redirectTo: '/login', pathMatch: 'full'},
  { path: 'students', component: MaterialTableComponent, canActivate: [LoginAuthComponent]},
  { path: 'profile?id', component: StudentInfoTableComponent, canActivate: [LoginAuthComponent]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
