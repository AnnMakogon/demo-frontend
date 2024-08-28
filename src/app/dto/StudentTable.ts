export class StudentTable {    //то, что передается в таблицу без телефона
  constructor(){
    this.id = null;
    this.fio = "";
    this.group = "";
    this.departmentName = "";
  }

  id: number | null;
  fio: string;
  group: string;
  departmentName: string
}
