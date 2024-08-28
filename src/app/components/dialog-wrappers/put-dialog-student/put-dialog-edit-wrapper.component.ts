import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentUpdate } from 'src/app/dto/StudentUpdate';

@Component({
  selector: 'app-put-dialog-edit-wrapper',
  templateUrl: './put-dialog-edit-wrapper.component.html',
  styleUrls: ['./put-dialog-edit-wrapper.component.scss']
})
export class PutDialogEditWrapperComponent implements OnInit {

  course: string;
  group: string;

  editingStudent: StudentUpdate;
  showDepartmentMessage: boolean = false;

  constructor(public dialogRef: MatDialogRef<PutDialogEditWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentUpdate) {
      this.editingStudent = data;
      this.course = "";
      this.group = "";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

  courses: Array<string> = ["1", "2", "3"];
  departments: Array<string> = [];
  groups: Array<string> = [];

  courseDepartment: { [key: string]: string[] } = {
    "1": [],
    "2": ["KFA", "KMA", "KUCP"],
    "3": ["KFA", "KMA", "KUCP"],
  }

  departmentGroups: {[key: string]: {[department: string]: string[] } } = {
    "2": {
      "KFA": ["1.1", "1.2", "1.3"],
      "KMA": ["2.1"],
      "KUCP": ["3.1", "3.2"]
    },
    "3": {
      "KFA": ["1.1", "1.2", "1.3"],
      "KMA": ["2.1"],
      "KUCP": ["3.1", "3.2"]
    }
  }

  onCourseChange(selectedCourse: string): void {
    if (this.courseDepartment[selectedCourse].length === 0) {
      this.groups = ["1.1", "1.2", "1.3", "2.1", "3.1", "3.2"];
      this.departments = [];
      this.showDepartmentMessage = true;
    } else {
      this.departments = this.courseDepartment[selectedCourse];
      this.groups = [];
      this.editingStudent.departmentName = '';
      this.editingStudent.group = '';
      this.showDepartmentMessage = false;
    }
  }

  onDepartmentChange(selectedDepartment: string): void {
    const course = this.editingStudent.course;
    this.groups = this.departmentGroups[course]?.[selectedDepartment] || [];
    this.editingStudent.group = '';
  }

}
