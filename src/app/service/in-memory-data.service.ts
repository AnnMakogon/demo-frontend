import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(){
    const students = [
      {id: 0, name: "Name 0", surname: "Surname 0"},
      {id: 1, name: "Name 1", surname: "Surname 1"},
      {id: 2, name: "Name 2", surname: "Surname 2"},
      {id: 3, name: "Name 3", surname: "Surname 3"},
      {id: 4, name: "Name 4", surname: "Surname 4"},
      {id: 5, name: "Name 5", surname: "Surname 5"},
      {id: 6, name: "Name 6", surname: "Surname 6"},
    ];
    return {students};
  }

  genId(Students: Student[]): number {
    return Students.length > 0 ? Math.max(...Students.map(
      student => student.id ? student.id : 0)) + 1 : 11;
  }

}
