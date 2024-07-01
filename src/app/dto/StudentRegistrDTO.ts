export class StudentRegistrDTO {    //то, что вводит при регестрации
  constructor() {
    this.id = null;
    this.fio = "";
    this.group = "";
    this.phoneNumber = "";
    this.role = "";
    this.password_id = "";
    this.enable = true;
    this.email = "";
  }

  id: number | null;
  fio: string;
  group: string;
  phoneNumber: string;
  role: string;
  password_id: string;
  enable: boolean;
  email: string;
}
