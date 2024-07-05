import { Component, Injectable } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StudentRegistrDTO } from 'src/app/dto/StudentRegistrDTO';
import { UserLoginDTO } from 'src/app/dto/UserLoginDTO';
import { WebsocketServiceService } from 'src/app/service/websocket-service.service';

@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.scss']
})
export class LoginAuthComponent{

  title = 'Login';

  thisUser: UserLoginDTO;

  constructor( private authService : AuthServiceService,
               private route: Router,
               public dialog: MatDialog,
               private webSocketService: WebsocketServiceService
  ){
    this.thisUser = new StudentRegistrDTO();
  }

  login():void{                                    //при логинивании устанавливается коннект с вебсокетом
    console.log("full User: " + this.thisUser.fio);

    this.authService.loginUser(this.thisUser).subscribe(() =>{
      this.route.navigate(['/tabs'])
      //this.webSocketService.onConnect();
      //this.webSocketService.connect();
    });
  }

  registration(): void{
    this.route.navigate(['/registration']);
  }

}
