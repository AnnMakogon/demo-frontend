import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAuthComponent } from './components/autentification/login-auth/login-auth.component';
import { MaterialTableComponent } from './components/material-table/material-table.component';
import { RegistrationComponent } from './components/autentification/registration/registration.component';

const routes: Routes = [
  { path: 'login', component: LoginAuthComponent },
  { path: '',  redirectTo: '/login', pathMatch: 'full'},
  { path: 'students', component: MaterialTableComponent},
  { path: 'registration', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: []
})
export class AppRoutingModule { }
