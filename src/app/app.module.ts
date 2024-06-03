import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentEditorComponent } from './components/student-editor/student-editor.component';
import { TableStudentComponent } from './components/table-student/table-student.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { DialogEditWrapperComponent } from './components/student-editor/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { HttpClientModule } from '@angular/common/http';
import { PutDialogEditWrapperComponent } from './components/student-editor/put-dialog-edit-wrapper/put-dialog-edit-wrapper.component';
import { MaterialTableComponent } from './components/material-table/material-table.component';
import { MatButtonModule } from '@angular/material/button';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { LoginAuthComponent } from './components/autentification/login-auth/login-auth.component';
import { DtoPipe } from './dto.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StudentEditorComponent,
    TableStudentComponent,
    DialogEditWrapperComponent,
    PutDialogEditWrapperComponent,
    MaterialTableComponent,
    LoginAuthComponent,
    DtoPipe
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
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
