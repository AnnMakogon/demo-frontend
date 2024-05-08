import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { User } from 'src/app/models/user';
import { Base64 } from './Base64';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) {}

  private roleResponse: Array<Object>[] | null = new Array;

  private role: String | null = '';

  public RoleArray: String[] = new Array("STUDENT", "ADMIN");

  public getRole(): String | null{
    return this.role;
  }

  /*loginUser(user: User): Observable <HttpResponse<Array<Object>[]>> {
    const userUrl = '/api/login';
    console.log ('auth this student');
    const np: string = user.username + ":" + user.password;
    const headers = new HttpHeaders({
      //'Cookie': document.cookie,
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Base64.encode(np)
    });

    //document.cookie = '';

    const postData = {
      grant_type: 'password',
      username: user.username,
      password: user.password
    };

    return this.http.post<Array<Object>[]>(userUrl, JSON.stringify(postData),
                                           {headers, observe: 'response', responseType: 'json'}).pipe();
  }*/


  loginUser(user: User): Observable<HttpResponse<Array<Object>[]>> {
    const userUrl = '/api/login';
    console.log ('auth this student');
    const np: string = user.username + ":" + user.password;
    const headers = new HttpHeaders({
      //'Cookie': document.cookie,
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Base64.encode(np)

    });

    //document.cookie = '';

    const postData = {
      grant_type: 'password',
      username: user.username,
      password: user.password
    };

    return this.http.post<Array<Object>[]>(userUrl, JSON.stringify(postData),{headers, observe: 'response', responseType: 'json'}).pipe();
  }


  /*reguesLogin(user: User): Subscription{
    return this.loginUser(user).subscribe((response: HttpResponse<Array<Object>[]>) => {
      this.roleResponse = response.body;
      let roleJSONString;
      let roleJSON;
      debugger;

      //console.log('Response: ', response);

      if(this.roleResponse != null) {
        roleJSONString = JSON.stringify(this.roleResponse[0]);
        roleJSON = JSON.parse(roleJSONString);
        //console.log('JSON Role: ' + roleJSON.role);
        //console.log('typeOf roleJSON.role: ' + typeof( roleJSON.role));
      };
      this.role = roleJSON.role;
      //console.log('Role: ', this.role);
      debugger;
    });
    //return this.role;
  }*/



  /*reguesLogin(user: User): void{

      this.roleResponse = this.responseLogin(user);
      let roleJSONString;
      let roleJSON;
      debugger;


      if(this.roleResponse != null) {
        roleJSONString = JSON.stringify(this.roleResponse[0]);
        roleJSON = JSON.parse(roleJSONString);

      };
      this.role = roleJSON.role;

      debugger;
    };
    //return this.role;*/





  /*responseLogin(user: User): void {
    this.loginUser(user).subscribe((response: HttpResponse<Array<Object>[]>) => {
      debugger;
      //this.body = response.body;
    });
      /*console.log("this.roleResponse: " + this.roleResponse);
      debugger;
      let roleJSONString;
      let roleJSON;

      if(this.roleResponse != null) {
        roleJSONString = JSON.stringify(this.roleResponse[0]);
        roleJSON = JSON.parse(roleJSONString);
      };
       roleJSON.role;

    return roleJSON.role;
  }*/





  logoutUser(user: User): Observable<User> {
    const userUrl = '/api/logout';
    console.log('logout this user');
    const headers = new HttpHeaders({
     'Content-Type': 'application/json',
   });

    const postData = {
      grant_type: 'password',
      username: user.username,
      password: user.password
    };

    return this.http.post<User>(userUrl, JSON.stringify(postData), {headers} ).pipe();
  }

  /*canActivate(): boolean{
    //this.reguesLogin(user);
    if(this.role == this.RoleArray[0]){
      debugger
      return true;
    }else {
    return false;
    }
  }*/

}
