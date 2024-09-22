import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentRegistr } from '../dto/StudentRegistr';
import { StudentUpdate } from '../dto/StudentUpdate';
import { StudentFullTable } from '../dto/StudentFullTable';
import { Page } from '../dto/Page';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})

export class StudentServiceService {

  private studentsUrl = 'api/base/students/';

  public totalLength: number = 0;

  public column: String | undefined;
  public filter: String | undefined;

  direction: String = "";

  constructor(private http: HttpClient) { }

  getStudentsPage(page: Number, size: Number, column: String, direction: String, filter: String): Observable<Page<StudentFullTable>> {
    let params = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('column', column.toString())
      .append('direction', direction.toString())
      .append('filter', filter.toString());
    return this.http.get<Page<StudentFullTable>>(this.studentsUrl, { params });
  }

  registration(student: StudentRegistr): Observable<StudentRegistr> {
    console.log('registration');
    return this.http.post<StudentRegistr>("api/base/registration/", student, httpOptions).pipe(); // не работеть запрос
  }

  updateStudent(student: StudentUpdate, id: any): Observable<null | StudentUpdate> {
    console.log('put this student');
    id = Number(id);
    return this.http.put<StudentUpdate>(this.studentsUrl, student, httpOptions).pipe();
  }

  deleteStudent(id: Number): Observable<StudentFullTable> {
    console.log("Delete Student");
    const url = `${this.studentsUrl}` + `${id}`;
    return this.http.delete<StudentFullTable>(url, httpOptions).pipe();
  }

}
