import { BaseServiceService } from 'src/app/service/base-service.service';
import { Component, OnInit, AfterViewInit, ViewChild, NgModule } from '@angular/core';
import { Student } from 'src/app/models/student';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditWrapperComponent } from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { PutDialogEditWrapperComponent } from '../student-editor/put-dialog-edit-wrapper/put-dialog-edit-wrapper.component';

import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Sort, MatSortModule, MatSort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LogoutAuthComponent } from '../autentification/logout-auth/logout-auth.component';
import { AuthServiceService } from '../autentification/auth-service.service';
import { LoginAuthComponent } from '../autentification/login-auth/login-auth.component';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss'],
  providers:[LogoutAuthComponent],
})
export class MaterialTableComponent implements OnInit{

  totalDataLength: number = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  startIndex = 0;
  endIndex = this.pageSize;

  lastClickedColumn: string = 'id';

  filterValue: string | undefined = "";

  displayedColumns: string[] = ['demo-id', 'demo-name', 'demo-surname', 'demo-phoneNumber', 'demo-action'];

  dataSource = new MatTableDataSource<Student>;

  constructor(
    private baseService : BaseServiceService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private logoutAut : LogoutAuthComponent,
    private loginAuth : LoginAuthComponent,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void{
    console.log ("Material Table Component");
    this.updateData(this.startIndex, this.endIndex);
  }

  onPageChange(event: PageEvent) {
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if(this.endIndex > this.totalDataLength) {
      this.endIndex = this.totalDataLength;
    }
    console.log(`Загрузка данных для элементов с ${this.startIndex} по ${this.endIndex}`);
    this.updateData(this.startIndex, this.endIndex);
  }

  onColumnHeaderClick(columnName: string): void {
    this.lastClickedColumn = columnName;
    console.log("выбрана колонка " + this.lastClickedColumn);
    this.updateData(this.startIndex, this.endIndex);
  }

  updateData(start: Number, end: Number) {
    this.baseService.getStudentsPag(start, end, "", this.filterValue).subscribe( data => {
      this.dataSource.data = data;
      this.totalDataLength = this.baseService.totalLength;
      debugger;
    });
  }

  sortData( sortState: Sort ){
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  filterData( event: Event ) {
    this.filterValue = (event.target as HTMLInputElement).value;

    this.baseService.getStudentsPag(this.startIndex, this.pageSize, "", this.filterValue).subscribe( data => {
      this.dataSource.data = data;
      debugger;
      this.baseService.getLength();
      debugger;
    });
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
          this.updateData(this.startIndex, this.endIndex);
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
          this.updateData(this.startIndex, this.endIndex);
       });
      }
    });
  }

  deleteStudent(student: Student): void {
    console.log("delete student");
    const id = Number(student.id);
    this.baseService.deleteStudent(id).subscribe( () =>{
      this.updateData(this.startIndex, this.endIndex);
   });
  }

  logout(): void {
    this.logoutAut.logout();
  }

  getRole(){
    debugger;
    console.log("Role from materialTable: " + this.loginAuth.getRole());
  }

}
