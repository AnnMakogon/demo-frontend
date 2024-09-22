import { NgModule } from '@angular/core';
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
import { MaterialTableComponent } from './components/student-table/student-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { LoginAuthComponent } from './components/autentification/login-auth/login-auth.component';
import { RegistrationComponent } from './components/autentification/registration/registration.component';
import { CommonModule } from '@angular/common';
import { ErrorInterceptorService } from './components/ErrorInterceptor';
import { DelDialogEditWrapperComponent } from './components/dialog-wrappers/del-dialog-student/del-dialog-edit-wrapper.component';
import { CreateNewsletterComponent } from './components/createNewsletter/create-newsletter.component';
import { MatSelectModule } from '@angular/material/select';
import { TabsComponent } from './components/tabs/tabs.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';

import { PutDialogEmailComponent } from './components/dialog-wrappers/put-dialog-email/put-dialog-email.component';
import { PutDataDialogEmailComponent } from './components/dialog-wrappers/putData-dialog-email/putData-dialog-email.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { EmailTableComponent } from './components/email-table/email-table.component';
import { MatIconModule as matIconModule } from '@angular/material/icon';

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
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    matIconModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
