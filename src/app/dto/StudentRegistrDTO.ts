export class StudentRegistrDTO {
  constructor() {
    this.id = null;
    this.fio = "";
    this.group = "";
    this.phoneNumber = "";
    this.role = "";
    this.password_id = "";
    this.enable = true;
  }

  id: number | null;
  fio: string;
  group: string;
  phoneNumber: string;
  role: string;
  password_id: string;
  enable: boolean;
}
