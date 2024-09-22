import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DelDialogEditWrapperComponent } from '../del-dialog-student/del-dialog-edit-wrapper.component';
import { StudentFullTable } from 'src/app/dto/StudentFullTable';

@Component({
  selector: 'app-del-dialog-email',
  templateUrl: './del-dialog-email.component.html',
  styleUrls: ['./del-dialog-email.component.scss']
})
export class DelDialogEmailComponent implements OnInit {

  decision: StudentFullTable;

  constructor(public dialogRef: MatDialogRef<DelDialogEditWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentFullTable) {
    this.decision = data;
  }

  noDel(): void {
    this.dialogRef.close(false);
  }
  yesDel(): void {
    this.dialogRef.close(true);
  }

  ngOnInit() {
  }

}
