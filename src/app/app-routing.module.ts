import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAuthComponent } from './components/autentification/login-auth/login-auth.component';
import { MaterialTableComponent } from './components/student-table/student-table.component';
import { RegistrationComponent } from './components/autentification/registration/registration.component';
import { CreateNewsletterComponent } from './components/createNewsletter/create-newsletter.component';
import { TabsComponent } from './components/tabs/tabs.component';

import { CommonModule } from '@angular/common';
import { EmailTableComponent } from './components/email-table/email-table.component';
import { SaveRegistrationComponent } from './components/autentification/registration/saveRegistration/saveRegistration.component';

const routes: Routes = [
  { path: 'login', component: LoginAuthComponent },
  { path: '',  redirectTo: '/login', pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent },
  { path: 'newNewsletter', component: CreateNewsletterComponent },
  { path: 'tabs', component: TabsComponent, children:[
    { path: 'students', component: MaterialTableComponent },
    { path: 'newsletter', component: EmailTableComponent },
  ]},
  { path: 'saveregistration', component: SaveRegistrationComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: []
})
export class AppRoutingModule { }
