import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PutDialogEditWrapperComponent } from '../dialog-wrappers/put-dialog-student/put-dialog-edit-wrapper.component';
import { PageEvent } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { LogoutAuthComponent } from '../autentification/logout-auth/logout-auth.component';
import { StudentUpdate } from 'src/app/dto/StudentUpdate';
import { StudentFullTable } from 'src/app/dto/StudentFullTable';
import { User } from 'src/app/dto/User';
import { DelDialogEditWrapperComponent } from '../dialog-wrappers/del-dialog-student/del-dialog-edit-wrapper.component';
import { StudentServiceService } from 'src/app/service/student-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss'],
  providers: [LogoutAuthComponent],
})
export class MaterialTableComponent implements OnInit {

  pageSize: number = 10;
  pageNum: number = 0;
  column: String = "fio";
  direction: String = "";
  filterValue: String = "";

  totalDataLength: number = 0;

  pageSizeOptions: number[] = [5, 10, 25, 50];
  startIndex: number = 0;
  endIndex = this.pageSize;

  countColumn: number = 0;

  displayedColumns: string[] = ['demo-id', 'demo-name', 'demo-group', "demo-course", "demo-depName", 'demo-phoneNumber', 'demo-action'];

  persUser: User;

  dataSource = new MatTableDataSource<StudentFullTable>;
  constructor(
    private baseService: StudentServiceService,
    public dialog: MatDialog,
    private logoutAut: LogoutAuthComponent,
    private route: Router

  ) {
    this.dataSource = new MatTableDataSource();
    this.persUser = new User();
  }

  ngOnInit(): void {
    console.log("Material Table Component");
    const userData = sessionStorage.getItem("0");
    if (userData) {
      this.persUser = JSON.parse(userData);
    }
    this.updateData();
    console.log(sessionStorage);
  }

  onPageChange(event: PageEvent) {
    this.pageNum = event.pageIndex;
    this.pageSize = event.pageSize;
    this.totalDataLength = event.length;
    this.updateData();
  }

  updateData() {
    this.baseService.getStudentsPage(this.pageNum, this.pageSize, this.column, this.direction, this.filterValue).subscribe(data => {
      data.content.forEach((student: StudentFullTable) => {
        if (student.group == null && student.course == null){
          student.group = "?";
          student.course = "?";
        }else{
          student.course = student.course.slice(7)
          student.group = student.group.slice(6).replace("_", ".");
        }

      });
      this.dataSource.data = data.content;
      this.totalDataLength = data.totalElements;
    });
  }

  sortData(sortState: Sort) {
    if (sortState.direction) {
      this.direction = sortState.direction;
      this.column = sortState.active;
    } else {
      this.direction = "";
      this.column = "id";
    }
    this.updateData();
  }

  filterData(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.updateData();
  }

  updateStudent(student: StudentUpdate): void {
    const dialogPutStudent = this.dialog.open(PutDialogEditWrapperComponent, {
      width: '400px',
      data: student
    });
    dialogPutStudent.afterClosed().subscribe((result: StudentUpdate) => {
      if (result != null) {
        console.log("puting student: " + student.fio);
        result.group = "GROUP_" + ( result.group.replace(".","_"));
        result.course = "COURSE_" + result.course;
        this.baseService.updateStudent(result, student.id).subscribe(() => {
          this.updateData();
        });
      }
    });
  }

  deleteStudent(student: StudentFullTable): void {
    const dialogDelStudent = this.dialog.open(DelDialogEditWrapperComponent, {
      width: '400px',
      data: student
    });
    dialogDelStudent.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        console.log("delete student");
        const id = Number(student.id);
        this.baseService.deleteStudent(id).subscribe(() => {
          this.updateData();
        });
      }
    })

  }

  logout(): void {
    this.logoutAut.logout();
  }

  navigateTo(route: string) {
    this.route.navigate([route]);
  }

}
