export class NewsletterTable {
  constructor(){
    this.id = null;
    this.date = "";
    this.text = "";
    this.subject = "";
    this.sent = false;
    this.status = "";
  }
  id: null | number;
  date: string;
  text: string;
  subject: string;
  sent: boolean | string;
  status: string;
}
