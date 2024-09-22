import { DateForChange } from "./DateForChange";

export class NewsletterWithDate {
  constructor() {
    this.id = null;
    this.date = new DateForChange();
    this.text = "";
    this.subject = "";
    this.sent = false;
    this.status = "";
  }
  id: null | number;
  date: DateForChange;
  text: string;
  subject: string;
  sent: boolean;
  status: string;
}

