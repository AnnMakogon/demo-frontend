import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})

export class BaseServiceService {

  private studentsUrl = 'api/base/students/';

  public totalLength: number = 0;

  public column: String | undefined;
  public filter: String | undefined;

  direction: String = "";

  constructor( private http: HttpClient ) { }

  getStudentsPag(page: Number, size: Number, column: String, direction: String, filter: String): Observable<Student[]> {
    let params = new HttpParams()
              .append('page', page.toString())
              .append('size', size.toString())
              .append('column', column.toString())
              .append('direction', direction.toString())
              .append('filter', filter.toString());

    return this.http.get<Student[]>(this.studentsUrl, {params});
  }

  getFullLength(): Observable<number>{
    return this.http.get<number>('api/base/length');
  }

  addNewStudent(student: Student): Observable<Student> {
    console.log('addNewStudent');
    return this.http.post<Student>(this.studentsUrl, student).pipe();
  }

  updateStudent(student: Student, id: any): Observable<null | Student> {
    console.log ('put this student');
    id = Number(id);
    return this.http.put<Student>(this.studentsUrl, {id: id, fio: student.fio, group: student.group, phoneNumber: student.phoneNumber}, httpOptions).pipe();
  }

  deleteStudent(id : Number): Observable<Student> {
    console.log ("Delete Student");
    const url = `${this.studentsUrl}` + `${id}`;
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
