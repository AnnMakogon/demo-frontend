import { Component, Injectable, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StudentRegistr } from 'src/app/dto/StudentRegistr';
import { UserLogin } from 'src/app/dto/UserLogin';
import { WebsocketServiceService } from 'src/app/service/websocket-service.service';
import { User } from 'src/app/dto/User';

@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.scss']
})
export class LoginAuthComponent implements OnInit{

  title = 'Login';

  thisUser: UserLogin;

  constructor( private authService : AuthServiceService,
               private route: Router,
               public dialog: MatDialog,
               private webSocketService: WebsocketServiceService
  ){
    this.thisUser = new StudentRegistr();
  }

  ngOnInit(): void {
    sessionStorage.removeItem("0");
  }

  login():void{                                    //при логинивании устанавливается коннект с вебсокетом
    console.log("full User: " + this.thisUser.fio);

    this.authService.loginUser(this.thisUser).subscribe((result: User) =>{
      sessionStorage.setItem("0", JSON.stringify(result));
      console.log(result.username);
      this.route.navigate(['/tabs/students'])
    });
  }

  registration(): void{
    this.route.navigate(['/registration']);
  }

}
