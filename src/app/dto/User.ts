export class User {           // для передачи с бека персонального юзера (информация про вошедшего)
  constructor() {
    this.id = null;
    this.username = "";
    this.role = "";
    this.enable = true;
    this.enableEmail = false;
    this.studentId = null;
  }

  id: null | number;
  username: string;
  role: string;
  enable: boolean;
  enableEmail: boolean;
  studentId: null | number;
}
