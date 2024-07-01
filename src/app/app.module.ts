import { NgModule/*, CUSTOM_ELEMENTS_SCHEMA*/ } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PutDialogEditWrapperComponent } from './components/dialog-wrappers/put-dialog-student/put-dialog-edit-wrapper.component';
import { MaterialTableComponent } from './components/material-table/material-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { LoginAuthComponent } from './components/autentification/login-auth/login-auth.component';
import { RegistrationComponent } from './components/autentification/registration/registration.component';
import { CommonModule } from '@angular/common';
import { Error401InterceptorService } from './components/autentification/Error401Interceptor';
import { DelDialogEditWrapperComponent } from './components/dialog-wrappers/del-dialog-student/del-dialog-edit-wrapper.component';
import { CreateNewsletterComponent } from './components/createNewsletter/newsletter.component';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { TabsComponent } from './components/tabs/tabs.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EmailTableComponent } from './emailTable/emailTable.component';
import { PutDialogEmailComponent } from './components/dialog-wrappers/put-dialog-email/put-dialog-email.component';
import { PutDataDialogEmailComponent } from './components/dialog-wrappers/putData-dialog-email/putData-dialog-email.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    PutDialogEditWrapperComponent,
    DelDialogEditWrapperComponent,
    MaterialTableComponent,
    LoginAuthComponent,
    RegistrationComponent,
    CreateNewsletterComponent,
    TabsComponent,
    EmailTableComponent,
    PutDialogEmailComponent,
    PutDataDialogEmailComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatCheckboxModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Error401InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
