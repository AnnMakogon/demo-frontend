import { Component, Injectable, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { User } from 'src/app/models/user';
import { LoginAuthComponent } from '../login-auth/login-auth.component';

@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'app-logout-auth',
  templateUrl: './logout-auth.component.html',
  styleUrls: ['./logout-auth.component.scss'],
  providers: [],
})
export class LogoutAuthComponent implements OnInit {

  editingUser: User;

  constructor(private authService : AuthServiceService,
              private loginAuth : LoginAuthComponent
  ) {
    this.editingUser = loginAuth.getEditUser();
  }

  ngOnInit() {
  }

  logout():void{
    this.authService.logoutUser(this.editingUser);
    this.editingUser = new User;
  }


}
