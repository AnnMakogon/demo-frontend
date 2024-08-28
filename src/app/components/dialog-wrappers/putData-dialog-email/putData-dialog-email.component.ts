import { formatDate } from '@angular/common';
import { Component, Inject, OnInit, ChangeDetectorRef  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateForChange } from 'src/app/dto/DateForChange';
import { Newsletter } from 'src/app/dto/Newsletter';

@Component({
  selector: 'app-putData-dialog-email',
  templateUrl: './putData-dialog-email.component.html',
  styleUrls: ['./putData-dialog-email.component.scss']
})
export class PutDataDialogEmailComponent implements OnInit {

  editingNlDate: DateForChange;
  originalDate: string = "";
  selectedDate: Date | null;

  constructor(public dialogRef: MatDialogRef<PutDataDialogEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Newsletter,
  ) {
      this.editingNlDate = this.convertToDateForChangeDto(data.date);
      if (this.editingNlDate) {
        this.originalDate = this.editingNlDate.calendarDate + " " + this.editingNlDate.hour + ":" + this.editingNlDate.minute;
        this.selectedDate = this.parseDate(this.originalDate);
      } else {
        this.selectedDate = null;
      }
    }

  ngOnInit() {
  }

  getDate(event: any) {
    this.editingNlDate.calendarDate = formatDate(event.value, 'dd.MM.yyyy', 'en-US');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  hours: Array<string> = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
  minutes: Array<string> = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];

  parseDate(dateString: string): Date {

    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('.').map(part => parseInt(part, 10));
    const [hour, minute] = timePart.split(':').map(part => parseInt(part, 10));
    return new Date(year, month - 1, day, hour, minute);
    /*if (!dateString) {
      return null;
    }
    return new Date(dateString);*/
  }

    formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${day}.${month}.${year}`;
    }

    convertToDateForChangeDto(dateTimeString: string): DateForChange {
      const dto = new DateForChange();
      if (dateTimeString) {
        const [datePart, timePart] = dateTimeString.split(' ');
        if (datePart) {
          dto.calendarDate = datePart;
        }
        if (timePart) {
          const [hour, minute] = timePart.split(':');
          dto.hour = hour || '';
          dto.minute = minute || '';
        }
      }
      return dto;
    }

}
