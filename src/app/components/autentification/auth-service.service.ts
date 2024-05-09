import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Base64 } from './Base64';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) {}

  private role: String | null = '';

  public RoleArray: String[] = new Array("STUDENT", "ADMIN");

  public getRole(): String | null{
    return this.role;
  }

  loginUser(user: User): Observable<HttpResponse<Array<Object>[]>> {
    const userUrl = '/api/login';
    console.log ('auth this student');
    const np: string = user.username + ":" + user.password;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Base64.encode(np)
    });

    const postData = {
      grant_type: 'password',
      username: user.username,
      password: user.password
    };

    return this.http.post<Array<Object>[]>(userUrl, JSON.stringify(postData),{headers, observe: 'response', responseType: 'json'}).pipe();
  }

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

}
