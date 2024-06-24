import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentUpdateDTO } from 'src/app/dto/StudentUpdateDTO';

@Component({
  selector: 'app-put-dialog-edit-wrapper',
  templateUrl: './put-dialog-edit-wrapper.component.html',
  styleUrls: ['./put-dialog-edit-wrapper.component.scss']
})
export class PutDialogEditWrapperComponent implements OnInit {
  editingStudent: StudentUpdateDTO;

  constructor(public dialogRef: MatDialogRef<PutDialogEditWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentUpdateDTO) {
      this.editingStudent = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

}
