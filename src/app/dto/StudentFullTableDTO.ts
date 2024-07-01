export class StudentFullTableDTO {    //то, что передается в таблицу с телефоном
  constructor() {
    this.id = null;
    this.fio = "";
    this.group = "";
    this.phoneNumber = "";
  }

  id: null | number;
  fio: string;
  group: string;
  phoneNumber: string;
}
