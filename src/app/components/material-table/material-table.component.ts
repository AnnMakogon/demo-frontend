import { BaseServiceService } from 'src/app/service/base-service.service';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { MatDialog } from '@angular/material/dialog';
import { PutDialogEditWrapperComponent } from '../put-dialog-edit-wrapper/put-dialog-edit-wrapper.component';
import { PageEvent } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { LogoutAuthComponent } from '../autentification/logout-auth/logout-auth.component';
import { StudentUpdateDTO } from 'src/app/dto/StudentUpdateDTO';
import { StudentFullTableDTO } from 'src/app/dto/StudentFullTableDTO';
import { UserDTO } from 'src/app/dto/UserDTO';

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

  persUser: UserDTO;

  dataSource = new MatTableDataSource<StudentFullTableDTO>;
  constructor(
    private baseService : BaseServiceService,
    public dialog: MatDialog,
    private logoutAut : LogoutAuthComponent,
  ) {
    this.dataSource = new MatTableDataSource();
    this.persUser = new UserDTO();
  }

  ngOnInit(): void{
    console.log ("Material Table Component");
    this.baseService.getPersUser().subscribe(( persUser: UserDTO) => {
      this.persUser = persUser;
    });
    this.updateData();
  }

  onPageChange(event: PageEvent) {
    this.pageNum = event.pageIndex;
    this.pageSize = event.pageSize;
    this.totalDataLength = event.length;
    this.updateData();
  }

  updateData() {
    this.baseService.getFullLength().subscribe((length: number) => {
      this.totalDataLength = length;
    })

    this.baseService.getStudentsPag(this.pageNum, this.pageSize, this.column, this.direction, this.filterValue).subscribe( data => {
      this.dataSource.data = data;
      this.dataSource.data.forEach((student: StudentFullTableDTO) =>{
        if(student.fio == this.persUser.username){
          this.persUser.id = student.id;
        }
      })
    });

  }

  sortData( sortState: Sort ){
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

  updateStudent(student : StudentUpdateDTO): void {
    const dialogPutStudent = this.dialog.open(PutDialogEditWrapperComponent, {
      width: '400px',
      data: student
    });
    dialogPutStudent.afterClosed().subscribe((result : StudentUpdateDTO) => {
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
