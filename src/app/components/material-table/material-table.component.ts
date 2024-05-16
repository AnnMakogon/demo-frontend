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

  pageSize: number = 10;
  pageNum: number = 0;
  column: String = "id";
  direction: String = "";
  filterValue: String = "";
  //filterValue: string | undefined = "";

  totalDataLength: number = 0;

  pageSizeOptions: number[] = [5, 10, 25, 50];
  startIndex: number = 0;
  endIndex = this.pageSize;

  countColumn: number = 0;

  displayedColumns: string[] = ['demo-id', 'demo-name', 'demo-surname', 'demo-phoneNumber', 'demo-action'];

  dataSource = new MatTableDataSource<Student>;

  //@ViewChild(MatSort) sort!: MatSort;

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
    this.updateData();
  }

  onPageChange(event: PageEvent) {
    /*this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if(this.endIndex > this.totalDataLength) {
      this.endIndex = this.totalDataLength;
    }
    console.log(`Загрузка данных для элементов с ${this.startIndex} по ${this.endIndex}`);*/
    this.pageNum = event.pageIndex;
    this.pageSize = event.pageSize;
    this.totalDataLength = event.length;
    debugger;
    this.updateData();
  }

  /*onColumnClick(columnName: string): void {  //сделать доп поле для счета, сколько раз нажали по колонке, его тоже передавать на бек
    if(this.lastClickedColumn == columnName && this.countColumn < 3) {
      this.countColumn ++;
    } else {
      if(this.countColumn == 3) {
        this.countColumn = 0;
      } else {
        this.countColumn = 1;
      }
    }
    this.lastClickedColumn = columnName;
    console.log("выбрана колонка " + this.lastClickedColumn);
    debugger;
    this.updateData(this.pageNum, this.pageSize);
  }*/

  /*updateData(page: Number, size: Number) {   //в самом начале и при пагинации и сортировке
    this.baseService.getFullLength().subscribe((length: number) =>{
      this.totalDataLength = length;
    debugger;})

    this.baseService.getStudentsPag(page, size, this.lastClickedColumn, this.direction, this.filterValue).subscribe( data => {
      this.dataSource.data = data;
      //this.dataSource.sort = this.sort;
      debugger;
    });
  }*/

  updateData() {   //в самом начале и при пагинации и сортировке
    this.baseService.getFullLength().subscribe((length: number) =>{
      this.totalDataLength = length;
    debugger;})

    this.baseService.getStudentsPag(this.pageNum, this.pageSize, this.column, this.direction, this.filterValue).subscribe( data => {
      this.dataSource.data = data;
      debugger;
    });
  }

  /*upDataWithout(nonColumn : String ) {  //for add, update, delete, filter
    this.baseService.getFullLength().subscribe((length: number) =>{
      this.totalDataLength = length;
    debugger;})

    this.baseService.getStudentsPag(this.pageNum, this.pageSize, nonColumn, this.filterValue).subscribe( data => {
      this.dataSource.data = data;
      debugger;
    });
  }*/

  sortData( sortState: Sort ){   // сделать всю сортировку через это ивент
    debugger;
    /*if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }*/
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

    //this.upDataWithout("");
    this.updateData();

    /*this.baseService.getStudentsPag(this.pageNum, this.pageSize, "", this.filterValue).subscribe( data => {
      this.dataSource.data = data;
      debugger;
      //this.baseService.getLength();
      debugger;
    });*/
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
          //this.upDataWithout("");
          this.updateData();
          /*this.baseService.getStudentsPag(this.pageNum, this.pageSize, "", this.filterValue).subscribe( data => {
            this.dataSource.data = data;
            debugger;
          });*/
        });
      }
    });
  }

  updateStudent(student : Student): void {
    const dialogPutStudent = this.dialog.open(PutDialogEditWrapperComponent, {      //нужно чтоб не сортировало, а оставило так как есть,
      width: '400px',                                                               // т.е. по старой сортировке, но не меняя ничего
      data: student                                                                 // для этого отправляю в colomn "nothing"
    });
    dialogPutStudent.afterClosed().subscribe((result : Student) => {
      if(result != null) {
        console.log ("puting student: " + student.fio);
        this.baseService.updateStudent(result, student.id).subscribe( () =>{
          //this.upDataWithout("nothing");
          this.updateData();
          /*this.baseService.getStudentsPag(this.pageNum, this.pageSize, "nothing", this.filterValue).subscribe( data => {
            this.dataSource.data = data;
            //this.totalDataLength = this.baseService.totalLength;
            debugger;
          });*/
       });
      }
    });
  }

  deleteStudent(student: Student): void {
    console.log("delete student");
    const id = Number(student.id);
    this.baseService.deleteStudent(id).subscribe( () =>{
      //this.upDataWithout("");
      this.updateData();
      /*this.baseService.getStudentsPag(this.pageNum, this.pageSize, "", this.filterValue).subscribe( data => {
        this.dataSource.data = data;
        //this.totalDataLength = this.baseService.totalLength;
        debugger;
      });*/
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
