export class StudentFullTable {    //то, что передается в таблицу с телефоном
  constructor() {
    this.id = null;
    this.fio = "";
    this.group = "";
    this.phoneNumber = "";
    this.departmentName = "";
  }

  id: null | number;
  fio: string;
  group: string;
  phoneNumber: string;
  departmentName: string
}
