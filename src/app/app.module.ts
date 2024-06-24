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
import { PutDialogEditWrapperComponent } from './components/put-dialog-edit-wrapper/put-dialog-edit-wrapper.component';
import { MaterialTableComponent } from './components/material-table/material-table.component';
import { MatButtonModule } from '@angular/material/button';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { LoginAuthComponent } from './components/autentification/login-auth/login-auth.component';
import { RegistrationComponent } from './components/autentification/registration/registration.component';
import { CommonModule } from '@angular/common';
import { Error401InterceptorService } from './components/autentification/Error401Interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PutDialogEditWrapperComponent,
    MaterialTableComponent,
    LoginAuthComponent,
    RegistrationComponent
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
    CommonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Error401InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
