export class DateForChangeDto {
  constructor(){
    this.minute = "";
    this.hour = "";
    this.calendarDate = "";
  }

  minute: string;
  hour: string;
  calendarDate: string;

  toString(): String{
    return this.calendarDate + " " + this.minute + ":" + this.hour;
  }

}
