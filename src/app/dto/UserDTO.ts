export class UserDTO {           // для передачи с бека персонального юзера (информация про вошедшего)
  constructor() {
    this.id = null;
    this.username = "";
    this.role = "";
    this.enable = true;
  }

  id: null | number;
  username: string;
  role: string;
  enable: boolean;
}
