import { BaseServiceService } from 'src/app/service/base-service.service';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditWrapperComponent } from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { PutDialogEditWrapperComponent } from '../student-editor/put-dialog-edit-wrapper/put-dialog-edit-wrapper.component';

import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { LogoutAuthComponent } from '../autentification/logout-auth/logout-auth.component';
import { LoginAuthComponent } from '../autentification/login-auth/login-auth.component';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss'],
  providers:[LogoutAuthComponent],
})
export class MaterialTableComponent implements OnInit{

  pageSize: number = 10;
  pageNum: number = 0;
  column: String = "id";
  direction: String = "";
  filterValue: String = "";

  totalDataLength: number = 0;

  pageSizeOptions: number[] = [5, 10, 25, 50];
  startIndex: number = 0;
  endIndex = this.pageSize;

  countColumn: number = 0;

  displayedColumns: string[] = ['demo-id', 'demo-name', 'demo-surname', 'demo-phoneNumber', 'demo-action'];

  dataSource = new MatTableDataSource<Student>;

  constructor(
    private baseService : BaseServiceService,
    public dialog: MatDialog,
    private logoutAut : LogoutAuthComponent,
    private loginAuth : LoginAuthComponent,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void{
    console.log ("Material Table Component");
    this.updateData();
  }

  onPageChange(event: PageEvent) {
    this.pageNum = event.pageIndex;
    this.pageSize = event.pageSize;
    this.totalDataLength = event.length;
    debugger;
    this.updateData();
  }

  updateData() {
    this.baseService.getFullLength().subscribe((length: number) =>{
      this.totalDataLength = length;
    debugger;})

    this.baseService.getStudentsPag(this.pageNum, this.pageSize, this.column, this.direction, this.filterValue).subscribe( data => {
      this.dataSource.data = data;
      debugger;
    });
  }

  sortData( sortState: Sort ){
    debugger;
    if (sortState.direction) {
      this.direction = sortState.direction;
      this.column = sortState.active;
    } else {
      this.direction = "";
      this.column = "id";
    }
    this.updateData();
  }

  filterData( event: Event ) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.updateData();
  }


  addNewStudent(): void {
    const dialogAddingNewStudent = this.dialog.open(DialogEditWrapperComponent, {
      width: '400px',
      data: null
    });
    dialogAddingNewStudent.afterClosed().subscribe((result : Student) => {
      if(result != null) {
        console.log ("adding new student: " + result.fio);
        this.baseService.addNewStudent(result).subscribe( () => {
          this.updateData();
        });
      }
    });
  }

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

  deleteStudent(student: Student): void {
    console.log("delete student");
    const id = Number(student.id);
    this.baseService.deleteStudent(id).subscribe( () =>{
      this.updateData();
   });
  }

  logout(): void {
    this.logoutAut.logout();
  }

}
