export class StudentUpdate {
  constructor() {
    this.id = null;
    this.fio = "";
    this.group = "";
    this.phoneNumber = "";
    this.departmentName = "";
    this.course = "";
  }

  id: number | null;
  fio: string;
  group: string;
  phoneNumber: string;
  departmentName: string;
  course: string;
}
