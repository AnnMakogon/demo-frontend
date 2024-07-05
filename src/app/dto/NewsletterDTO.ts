export class NewsletterDTO {
  constructor(){
    this.id = null;
    this.date = "";
    //this.address = "";
    this.text = "";
    this.subject = "";
    this.mess = "";
    this.status = "";
  }
  id: null | number;
  date: string;
  //address: string;
  text: string;
  subject: string;
  mess: string;
  status: string;
}
