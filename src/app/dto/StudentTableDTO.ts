export class StudentTableDTO {    //то, что передается в таблицу без телефона
  constructor(){
    this.id = null;
    this.fio = "";
    this.group = "";
  }

  id: number | null;
  fio: string;
  group: string;
}
