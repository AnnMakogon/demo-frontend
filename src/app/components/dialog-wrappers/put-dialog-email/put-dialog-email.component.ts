import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateForChange } from 'src/app/dto/DateForChange';
import { NewsletterWithDate } from 'src/app/dto/NewsletterWithDate';

@Component({
  selector: 'app-put-dialog-email',
  templateUrl: './put-dialog-email.component.html',
  styleUrls: ['./put-dialog-email.component.scss']
})
export class PutDialogEmailComponent implements OnInit, AfterViewInit {

  editingNl: NewsletterWithDate;
  selectedDate: Date | null;

  constructor(
    public dialogRef: MatDialogRef<PutDialogEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewsletterWithDate,
    private cdr: ChangeDetectorRef) {
    this.editingNl = data ? data : new NewsletterWithDate();
    if (this.editingNl.date) {
      this.selectedDate = this.parseDate(this.editingNl.date.toString());
    } else {
      this.selectedDate = null;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDate(event: any) {
    const selectedDate: Date = event.value;
    const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
    this.editingNl.date.calendarDate = localDate.toISOString();
    console.log("this.date: " + this.editingNl.date.calendarDate)
  }

  ngOnInit() {
    if (this.data && this.data.date) {

      const dateStr = this.data.date.toString() as string;
      const dateParts = dateStr.split(' ');

      if (dateParts.length === 2) {
        const timeParts = dateParts[0].split(':');
        const datePart = dateParts[1];

        this.editingNl.date = new DateForChange();

        this.editingNl.date.hour = timeParts[0];
        this.editingNl.date.minute = timeParts[1];

        const [day, month, year] = datePart.split('.');

        this.editingNl.date.calendarDate = `${day}.${month}.${year}`;

      } else {
        this.editingNl.date = new DateForChange();
        this.selectedDate = null;
      }
    } else if (!this.editingNl.date) {
      this.editingNl.date = new DateForChange();
      this.selectedDate = null;
    }
  }

  parseDate(dateString: string): Date {
    const [timePart, datePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('.').map(part => parseInt(part, 10));
    const [hour, minute] = timePart.split(':').map(part => parseInt(part, 10));
    return new Date(year, month - 1, day, hour, minute);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  hours: Array<string> = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
  minutes: Array<string> = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];

}
