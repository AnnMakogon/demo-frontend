import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Base64 } from '../components/autentification/Base64';
import { StudentRegistr } from 'src/app/dto/StudentRegistr';
import { UserLogin } from 'src/app/dto/UserLogin';
import { User } from 'src/app/dto/User';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  constructor(private http: HttpClient) { }

  loginUser(user: UserLogin): Observable<User> {
    const userUrl = '/api/login';
    const np: string = user.fio + ":" + user.passwordId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Base64.encode(np)
    });

    console.log('auth this student');
    return this.http.post<User>(userUrl, null, { headers }).pipe();
  }

  logoutUser(): Observable<HttpResponse<Array<Object>[]>> {
    const userUrl = '/api/logout';
    console.log('logout this user');
    return this.http.post<HttpResponse<Array<Object>[]>>(userUrl, httpOptions);
  }

  registration(student: StudentRegistr): Observable<StudentRegistr> {
    const userUrl = '/api/base/registration/'

    console.log('registration of user: ' + student.fio);
    return this.http.post<StudentRegistr>(userUrl, student, httpOptions);
  }

}
