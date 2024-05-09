import { User } from 'src/app/models/user';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

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

  public RoleArray: String[] = ["STUDENT", "ADMIN"];

  private roleResponse: Array<Object>[] | null = new Array;

  private role: String | null;

  editingUser: User;

  constructor(private authService : AuthServiceService, private route: Router,
  ){
    this.editingUser = new User();
    this.role = "";
  }

  login():void{
    //debugger
    console.log("full User: " + this.editingUser.role)
    this.authService.loginUser(this.editingUser)
    .subscribe(
      (response: HttpResponse<Array<Object>[]>) => {
        this.roleResponse = response.body;
        let roleJSONString;
        let roleJSON;
        if(this.roleResponse != null) {
          roleJSONString = JSON.stringify(this.roleResponse[0]);
          roleJSON = JSON.parse(roleJSONString);
          console.log('JSON Role: ' + roleJSON.role);
          console.log('typeOf roleJSON.role: ' + typeof( roleJSON.role));
        };
        this.role = roleJSON.role;
        this.editingUser.role = roleJSON.role;
        console.log('Role: ' + this.role);
        console.log("this.editingUser: " +  this.editingUser.role)
        //debugger;
      }
    );
  }

  getRole(){
    console.log("get Role from login-auth: " + this.editingUser.role);
    return this.editingUser.role;
  }

  getEditUser(): User {
    return this.editingUser;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    this.canActivate(route, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    console.log(this.editingUser.role);
    if (this.RoleArray.includes( "STUDENT" )){
      debugger;
      console.log("ВЫ ЗАРЕГЕСТРИРОВАННЫ");
      return true;
    }
    debugger
    console.log ("ВЫ НЕ ЗАРЕГЕСТРИРОВАННЫ");
    this.route.navigate(['/login']);
    return false;
  }

  resolve(): boolean{
      debugger
    return true;
  }

}
