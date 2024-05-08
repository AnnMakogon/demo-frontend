import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-put-dialog-edit-wrapper',
  templateUrl: './put-dialog-edit-wrapper.component.html',
  styleUrls: ['./put-dialog-edit-wrapper.component.scss']
})
export class PutDialogEditWrapperComponent implements OnInit {
  editingStudent: Student;

  constructor(public dialogRef: MatDialogRef<PutDialogEditWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student) {
      this.editingStudent = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

}
