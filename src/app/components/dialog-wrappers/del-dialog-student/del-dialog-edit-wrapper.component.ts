import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { StudentFullTableDTO } from 'src/app/dto/StudentFullTableDTO';

@Component({
  selector: 'app-del-dialog-edit-wrapper',
  templateUrl: './del-dialog-edit-wrapper.component.html',
  styleUrls: ['./del-dialog-edit-wrapper.component.scss']
})
export class DelDialogEditWrapperComponent implements OnInit {

  decision: StudentFullTableDTO;

  constructor(public dialogRef: MatDialogRef<DelDialogEditWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentFullTableDTO){
      this.decision = data;
    }

  noDel():void {
    this.dialogRef.close(false);
  }
  yesDel(): void {
    this.dialogRef.close(true);
  }

  ngOnInit() {}

}
