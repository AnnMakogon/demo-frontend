import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/dto/User';
import { StudentServiceService } from 'src/app/service/student-service.service';
import { LogoutAuthComponent } from '../autentification/logout-auth/logout-auth.component';

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
    private logoutAut: LogoutAuthComponent,) {
    this.persUser = new User();
  }

  ngOnInit() {
    const userData = sessionStorage.getItem("0");
    if (userData) {
      this.persUser = JSON.parse(userData);
    }
    this.checkRole();
    this.title = "Hello Mr." + this.persUser.username;
  }

  logout(): void {
    this.logoutAut.logout();
  }

  checkRole() {
    if (this.persUser && this.persUser.role === "[ADMIN]") {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

}
