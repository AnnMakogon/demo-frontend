import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { BaseServiceService } from 'src/app/service/base-service.service';

@Component({
  selector: 'app-student-editor',
  templateUrl: './student-editor.component.html',
  styleUrls: ['./student-editor.component.scss']
})
export class StudentEditorComponent implements OnInit{
  editingStudent: Student;

  constructor(private baseService: BaseServiceService) {
    this.editingStudent = new Student();
  }

  ngOnInit(): void {}

  addStudent(): void{
    this.baseService.addNewStudent(this.editingStudent);
    this.editingStudent = new Student();
  }
}
