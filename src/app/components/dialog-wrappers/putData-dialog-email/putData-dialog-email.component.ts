import { formatDate } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateForChangeDto } from 'src/app/dto/DateForChangeDTO';
import { NewsletterDTO } from 'src/app/dto/NewsletterDTO';

@Component({
  selector: 'app-putData-dialog-email',
  templateUrl: './putData-dialog-email.component.html',
  styleUrls: ['./putData-dialog-email.component.scss']
})
export class PutDataDialogEmailComponent implements OnInit {

  editingNlData: DateForChangeDto;

  constructor(public dialogRef: MatDialogRef<PutDataDialogEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DateForChangeDto) {
      this.editingNlData = data;
    }

  ngOnInit() {
  }

  /*ngOnDestroy(): void {
    this.editingNlData += " " + this.minute + ":" + this.hour;
  }*/

  getDate(event: any) {
    this.editingNlData.calendarDate = formatDate(event.value, 'dd.MM.yyyy', 'en-US');
    debugger;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  hours: Array<string> = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
  minutes: Array<string> = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];


}
