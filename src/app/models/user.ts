export class User {
  constructor() {
    this.id = null;
    this.username = "";
    this.password = "";
    this.role = "";
    this.email = "";
  }

  id: null | number;
  username: string;
  password: string;
  role: string;
  email: string;
}
