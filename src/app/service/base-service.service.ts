import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentRegistrDTO } from '../dto/StudentRegistrDTO';
import { StudentUpdateDTO } from '../dto/StudentUpdateDTO';
import { StudentFullTableDTO } from '../dto/StudentFullTableDTO';
import { UserDTO } from '../dto/UserDTO';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

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

  getStudentsPag(page: Number, size: Number, column: String, direction: String, filter: String): Observable<StudentFullTableDTO[]> {
    let params = new HttpParams()
              .append('page', page.toString())
              .append('size', size.toString())
              .append('column', column.toString())
              .append('direction', direction.toString())
              .append('filter', filter.toString());

    return this.http.get<StudentFullTableDTO[]>(this.studentsUrl, {params});
  }

  getPersUser(): Observable<UserDTO> {
    return this.http.get<UserDTO>('api/persUser');
  }

  getFullLength(): Observable<number>{
    return this.http.get<number>('api/base/length');
  }

  registration(student: StudentRegistrDTO): Observable<StudentRegistrDTO> {
    console.log('registration');
    return this.http.post<StudentRegistrDTO>("api/base/registration/", student, {headers: headers}).pipe(); // не работеть запрос
  }

  addStudentTest(student: Student): Observable<Student> {
    console.log('addNewStudent');
    return this.http.post<Student>(this.studentsUrl, student).pipe();
  }

  updateStudent(student: StudentUpdateDTO, id: any): Observable<null | StudentUpdateDTO> {
    console.log ('put this student');
    id = Number(id);
    return this.http.put<StudentUpdateDTO>(this.studentsUrl, {id: id, fio: student.fio, group: student.group, phoneNumber: student.phoneNumber}, httpOptions).pipe();
  }

  deleteStudent(id : Number): Observable<Student> {
    console.log ("Delete Student");
    const url = `${this.studentsUrl}` + `${id}`;
    debugger
    return this.http.delete<Student>(url).pipe();
  }

  getOneStudent(student: Student): Observable<Student> {
    console.log ('put this student');
    return this.http.put<Student>(this.studentsUrl, student ).pipe();
  }

}
