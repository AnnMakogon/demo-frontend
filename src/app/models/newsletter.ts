import { User } from "./user";

export class Newsletter {
  constructor(){
    this.id = null;
    this.date = "";
    //this.address = "";
    this.text = "";
    this.subject = "";
    this.mess = false;
    this.status = false;
  }
  id: null | number;
  date: string;
  //address: string;
  text: string;
  subject: string;
  mess: boolean;
  status: boolean;
}

