import { Component, Injectable, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { UserLogin } from 'src/app/dto/UserLogin';
import { Router } from '@angular/router';
import { WebsocketServiceService } from 'src/app/service/websocket-service.service';

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

  editingUser: UserLogin;

  constructor(private authService : AuthServiceService,
              private route : Router,
              private webSocketServece: WebsocketServiceService
  ) {
    this.editingUser = new UserLogin();
  }

  ngOnInit() {}

  logout():void{
    this.authService.logoutUser().subscribe(() =>{
      //sessionStorage.removeItem("0");    // это происходит каждый раз, когда на /login приходит
      this.route.navigate(['/login']);
    });
  }
}
