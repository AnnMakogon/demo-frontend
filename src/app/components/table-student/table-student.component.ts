import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { DialogEditWrapperComponent } from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { PutDialogEditWrapperComponent } from '../student-editor/put-dialog-edit-wrapper/put-dialog-edit-wrapper.component';

@Component({
  selector: 'app-table-student',
  templateUrl: './table-student.component.html',
  styleUrls: ['./table-student.component.scss']
})
export class TableStudentComponent implements OnInit {
  students: Student[];

  constructor(private baseService: BaseServiceService,
    public dialog: MatDialog)
  {
    this.students = []
  }

  ngOnInit(): void{
    console.log("TableStudentComponent");
    this.baseService.getStudentsPag(1, 5, "id").subscribe(data => this.students = data);
  }

  addNewStudent(): void {
    const dialogAddingNewStudent = this.dialog.open(DialogEditWrapperComponent, {
      width: '400px',
      data: null
    });
    dialogAddingNewStudent.afterClosed().subscribe((result: Student) => {
      if(result != null) {
        console.log("adding new student: " + result.fio);
        this.baseService.addNewStudent(result).subscribe( k =>
          this.baseService.getStudentsPag(1, 5, "id").subscribe(data => this.students = data) );
      }
    });
  }

  updateStudent(student: Student):void {
    const dialogPutStudent = this.dialog.open(PutDialogEditWrapperComponent, {
      width: '400px',
      data: student
    });
    dialogPutStudent.afterClosed().subscribe((result : Student) => {
      console.log("Put student");
      if(result != null) {
        console.log ("puting student: " + student.id);
        this.baseService.updateStudent(result, student.id).subscribe( () =>
          this.baseService.getStudentsPag(1, 5, "id").subscribe(data => this.students = data) );
      }
    });
  }

  deleteStudent(student: Student): void {
    console.log ("delete student");
    const id = Number(student.id);
    this.baseService.deleteStudent(id).subscribe( () =>
      this.baseService.getStudentsPag(1, 5, "id").subscribe(data => this.students = data) );
  }

}
