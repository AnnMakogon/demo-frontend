import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})

export class BaseServiceService {

  private studentsUrl = 'api/base/students';

  constructor( private http: HttpClient ) { }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  addNewStudent(student: Student): Observable<Student> {
    console.log('addNewStudent');
    return this.http.post<Student>(this.studentsUrl, student).pipe();
  }

  putStudent(student: Student, id: any): Observable<null | Student> {
    console.log ('put this student');
    id = Number(id);
    return this.http.put<Student>(this.studentsUrl, {id: id, fio: student.fio, group: student.group, phoneNumber: student.phoneNumber}, httpOptions).pipe();
  }

  deleteStudent(id : Number): Observable<Student> {
    console.log ("Delete Student");
    const url = `${this.studentsUrl}` + '/' + `${id}`;
    debugger
    return this.http.delete<Student>(url).pipe(
      tap(request => console.log('Отправленный запрос:', request))
    );
  }

  getOneStudent(student: Student): Observable<Student> {
    console.log ('put this student');
    return this.http.put<Student>(this.studentsUrl, student ).pipe();
  }

}
