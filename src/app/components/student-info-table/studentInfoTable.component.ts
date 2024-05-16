import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { LoginAuthComponent } from '../autentification/login-auth/login-auth.component';
import { LogoutAuthComponent } from '../autentification/logout-auth/logout-auth.component';
import { PutDialogEditWrapperComponent } from '../student-editor/put-dialog-edit-wrapper/put-dialog-edit-wrapper.component';

@Component({
  selector: 'app-studentInfoTable',
  templateUrl: './studentInfoTable.component.html',
  styleUrls: ['./studentInfoTable.component.scss']
})
export class StudentInfoTableComponent implements OnInit {

  displayedColumns: string[] = ['demo-id', 'demo-name', 'demo-surname', 'demo-phoneNumber', 'demo-action'];

  dataSource = new MatTableDataSource<Student>;


  constructor( private baseService : BaseServiceService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private logoutAut : LogoutAuthComponent,
    private loginAuth : LoginAuthComponent,
    private loginComp : LoginAuthComponent
  ) {
      this.dataSource = new MatTableDataSource();
  }

  ngOnInit():void {
    console.log ("student info Table Component");
    this.updateData();
  }
  updateData() {
    this.baseService.getStudentsPag(1, 1, "id", "","").subscribe( data => {
      this.dataSource.data = data;
    });}
  updateStudent(student : Student): void {
    const dialogPutStudent = this.dialog.open(PutDialogEditWrapperComponent, {
      width: '400px',
      data: student
    });
    dialogPutStudent.afterClosed().subscribe((result : Student) => {
      if(result != null) {
        console.log ("puting student: " + student.fio);
        this.baseService.updateStudent(result, student.id).subscribe( () =>{
          this.updateData();
       });
      }
    });
  }

}
