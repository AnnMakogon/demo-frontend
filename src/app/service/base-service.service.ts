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

  public totalLength: number = 10;

  constructor( private http: HttpClient ) { }

  getStudentsPag(start: Number, end: Number, column?: String): Observable<Student[]> {
    let params = new HttpParams();
    params = params.append('start', start.toString());
    params = params.append('end', end.toString());


    this.http.get<number>('api/base/length').subscribe((length: number) =>{
    this.totalLength = length;
    debugger;})
    debugger
    if (column != undefined){
    params = params.append('sort', column.toString());
    }else{
      params = params.append('sort', "id");
    }
    return this.http.get<Student[]>(this.studentsUrl, {params});
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
