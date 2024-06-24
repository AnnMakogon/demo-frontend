import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Base64 } from './Base64';
import { StudentRegistrDTO } from 'src/app/dto/StudentRegistrDTO';
import { UserLoginDTO } from 'src/app/dto/UserLoginDTO';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  constructor( private http: HttpClient ) {}

  loginUser(user: UserLoginDTO): Observable<HttpResponse<Array<Object>[]>> {
    const userUrl = '/api/login';
    const np: string = user.fio + ":" + user.password_id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Base64.encode(np)
    });

    const postData = {
      grant_type: 'password',
      username: user.fio,
      password: user.password_id
    };

    console.log ('auth this student');
    return this.http.post<Array<Object>[]>(userUrl, JSON.stringify(postData), {headers, observe: 'response'}).pipe();
  }

  logoutUser(): Observable<HttpResponse<Array<Object>[]>> {
    const userUrl = '/api/logout';
    const headers = new HttpHeaders({
     'Content-Type': 'application/json',
    });

    console.log('logout this user');
    return this.http.post<HttpResponse<Array<Object>[]>>(userUrl, {headers});
  }

  registration(student: StudentRegistrDTO) {
    const userUrl = '/api/base/registration/'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    console.log('registration');
    return this.http.post<StudentRegistrDTO>(userUrl, student, {headers}).subscribe();
  }

}
