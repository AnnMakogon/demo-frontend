import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewsletterDTO } from 'src/app/dto/NewsletterDTO';

@Component({
  selector: 'app-put-dialog-email',
  templateUrl: './put-dialog-email.component.html',
  styleUrls: ['./put-dialog-email.component.scss']
})
export class PutDialogEmailComponent implements OnInit {

  editingNl: NewsletterDTO;

  constructor(public dialogRef: MatDialogRef<PutDialogEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewsletterDTO) {
      this.editingNl = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDate(event: any) {
    this.editingNl.date = formatDate(event.value, 'dd.MM.yyyy', 'en-US');
  }

  ngOnInit() {
  }

}
