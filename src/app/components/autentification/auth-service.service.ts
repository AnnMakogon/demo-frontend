import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Base64 } from './Base64';
import { StudentRegistr } from 'src/app/dto/StudentRegistr';
import { UserLogin } from 'src/app/dto/UserLogin';
import { User } from 'src/app/dto/User';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  constructor( private http: HttpClient ) {}

  loginUser(user: UserLogin): Observable<User> {
    const userUrl = '/api/login';
    const np: string = user.fio + ":" + user.passwordId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic '+ Base64.encode(np)
    });

    console.log ('auth this student');
    return this.http.post<User>(userUrl, null, {headers}).pipe();
  }

  logoutUser(): Observable<HttpResponse<Array<Object>[]>> {
    const userUrl = '/api/logout';
    const headers = new HttpHeaders({
     'Content-Type': 'application/json',
    });

    console.log('logout this user');
    return this.http.post<HttpResponse<Array<Object>[]>>(userUrl, {headers});
  }

  registration(student: StudentRegistr): Observable<StudentRegistr> {
    const userUrl = '/api/base/registration/'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    console.log('registration of user: ' + student.fio);
    debugger;
    return this.http.post<StudentRegistr>(userUrl, student, {headers});
  }

}
