import { Component, Injectable, OnInit } from '@angular/core';
import { StudentRegistrDTO } from 'src/app/dto/StudentRegistrDTO';
import { AuthServiceService } from '../auth-service.service';

@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  title = 'Registration!';

  studentAuth: StudentRegistrDTO;

  constructor(private authService : AuthServiceService,)
  {
    this.studentAuth = new StudentRegistrDTO();
  }

  ngOnInit() {
  }

  registration(): void {
    console.log("Registration User: " + this.studentAuth.fio + this.studentAuth.password_id);
    this.authService.registration(this.studentAuth);
  }

}
