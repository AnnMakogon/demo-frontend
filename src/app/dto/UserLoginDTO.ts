export class UserLoginDTO {           // для залогинивания
  constructor() {
    this.id = null;
    this.fio = "";
    this.password_id = "";
  }

  id: number | null;
  fio: string;
  password_id: string;
}
