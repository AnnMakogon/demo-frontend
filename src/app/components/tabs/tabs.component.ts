import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/dto/User';
import { StudentServiceService } from 'src/app/service/student-service.service';
import { LogoutAuthComponent } from '../autentification/logout-auth/logout-auth.component';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  persUser: User;
  selectedIndex: number = 0;
  title: string = "Hello";
  isAdmin: boolean = false;

  constructor(private baseService: StudentServiceService,
    private router: Router,
    private logoutAut: LogoutAuthComponent,
    private authService: AuthServiceService
  ) {
    this.persUser = new User();
  }

  ngOnInit() {
    const userData = sessionStorage.getItem("0");
    if (userData) {
      this.persUser = JSON.parse(userData);
    }
    this.checkRole();
    this.title = "Hello Mr." + this.persUser.username;
    console.log(this.persUser);
  }

  logout(): void {
    this.logoutAut.logout();
  }

  confirmation(): void {
    this.authService.confirmation(this.persUser).subscribe(()=>{
      alert("The letter was sent by your email, open it, follow the link and log in again");
    });
  }

  checkRole() {
    if (this.persUser && this.persUser.role === "[ADMIN]") {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

}
