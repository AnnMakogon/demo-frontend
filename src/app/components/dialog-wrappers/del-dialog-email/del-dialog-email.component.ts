import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentFullTableDTO } from 'src/app/dto/StudentFullTableDTO';
import { DelDialogEditWrapperComponent } from '../del-dialog-student/del-dialog-edit-wrapper.component';

@Component({
  selector: 'app-del-dialog-email',
  templateUrl: './del-dialog-email.component.html',
  styleUrls: ['./del-dialog-email.component.scss']
})
export class DelDialogEmailComponent implements OnInit {

  decision: StudentFullTableDTO;

  constructor(public dialogRef: MatDialogRef<DelDialogEditWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentFullTableDTO) {
      this.decision = data;
    }

  noDel():void {
    this.dialogRef.close(false);
  }
  yesDel(): void {
    this.dialogRef.close(true);
  }

  ngOnInit() {
  }

}
