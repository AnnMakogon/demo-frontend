import { Address } from "./Address";

export class Newsletter {
  constructor(){
    this.id = null;
    this.date = "";
    this.text = "";
    this.subject = "";
    this.address = [];
    this.sent = false;
    this.status = "";
  }
  id: null | number;
  date: string;
  text: string;
  subject: string;
  address: Address[];
  sent: boolean | string;
  status: string;
}
