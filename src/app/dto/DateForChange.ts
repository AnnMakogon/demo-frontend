export class DateForChange {
  constructor(){
    this.minute = "";
    this.hour = "";
    this.calendarDate = "";
  }

  minute: string;
  hour: string;
  calendarDate: string;

  toString(): string{
    return this.calendarDate + " " + this.minute + ":" + this.hour;
  }

  toDate(): Date {
    const dateParts = this.calendarDate.split('.');
    const day = +dateParts[0];
    const month = +dateParts[1] - 1; // месяцы начинаются с 0
    const year = +dateParts[2];
    const hours = +this.hour;
    const minutes = +this.minute;

    return new Date(year, month, day, hours, minutes);
  }

}
