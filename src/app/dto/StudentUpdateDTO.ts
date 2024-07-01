export class StudentUpdateDTO {    // для обновления данных студента
  constructor() {
    this.id = null;
    this.fio = "";
    this.group = "";
    this.phoneNumber = "";
  }

  id: number | null;
  fio: string;
  group: string;
  phoneNumber: string;
}
