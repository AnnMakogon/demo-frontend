import { Component, Injectable, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../service/auth-service.service';
import { UserLogin } from 'src/app/dto/UserLogin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-logout-auth',
  templateUrl: './logout-auth.component.html',
  styleUrls: ['./logout-auth.component.scss'],
  providers: [],
})
export class LogoutAuthComponent implements OnInit {

  editingUser: UserLogin;

  constructor(private authService: AuthServiceService,
    private router: Router,
  ) {
    this.editingUser = new UserLogin();
  }

  ngOnInit() { }

  logout(): void {
    this.authService.logoutUser().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
