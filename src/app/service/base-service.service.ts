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

  constructor( private http: HttpClient ) { }

  getStudentsPag(page: Number, size: Number, column?: String, filter?: String): Observable<Student[]> {
    this.column = column;
    this.filter = filter;

    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    //this.getFullLength();

    debugger
    if (this.column != undefined){
      params = params.append('sort', this.column.toString());
    }else{
      params = params.append('sort', "");
    }

    if (this.filter != undefined){
      params = params.append('filter', this.filter.toString());
    }else{
      params = params.append('filter', "");
    }
    return this.http.get<Student[]>(this.studentsUrl, {params});
  }

  getFullLength(): Observable<number>{
    return this.http.get<number>('api/base/fulllength')/*.subscribe((length: number) =>{
      this.totalLength = length;
      debugger;})*/
  }

  getLength(): void {
    this.http.get<number>('api/base/length').subscribe((length: number) =>{
      this.totalLength = length;
      debugger;})
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
    const url = `${this.studentsUrl}` /*+ '/'*/ + `${id}`;
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
