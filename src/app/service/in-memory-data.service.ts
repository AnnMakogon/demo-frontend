import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService {

  constructor() { }

  genId(students: Student[]): number {
    return students.length > 0 ? Math.max(...students.map(
      student => student.id ? student.id : 0)) + 1 : 11;
  }

}
