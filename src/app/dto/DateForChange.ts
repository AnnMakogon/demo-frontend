export class DateForChange {
  constructor() {
    this.minute = "";
    this.hour = "";
    this.calendarDate = "";
  }

  minute: string;
  hour: string;
  calendarDate: string;

  toString(): string {
    return this.calendarDate + " " + this.minute + ":" + this.hour;
  }

}
