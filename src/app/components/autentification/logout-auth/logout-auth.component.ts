import { Component, Injectable, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { UserLoginDTO } from 'src/app/dto/UserLoginDTO';
import { Router } from '@angular/router';

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

  editingUser: UserLoginDTO;

  constructor(private authService : AuthServiceService,
              private route : Router
  ) {
    this.editingUser = new UserLoginDTO();
  }

  ngOnInit() {}

  logout():void{
    this.authService.logoutUser().subscribe(() =>
      this.route.navigate(['/login']));
    this.editingUser = new UserLoginDTO();
  }

}
