export class StudentRegistr {
  constructor() {
    this.id = null;
    this.fio = "";
    this.group = "";
    this.phoneNumber = "";
    this.role = "STUDENT";
    this.passwordId = "";
    this.enable = true;
    this.email = "";
    this.departmerntName = "";
    this.course = "";
  }

  id: number | null;
  fio: string;
  group: string;
  phoneNumber: string;
  role: string;
  passwordId: string;
  enable: boolean;
  email: string;
  departmerntName: string;
  course: string;
}
