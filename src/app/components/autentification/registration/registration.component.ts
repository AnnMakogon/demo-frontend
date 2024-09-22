import { Component, Injectable, OnInit } from '@angular/core';
import { StudentRegistr } from 'src/app/dto/StudentRegistr';
import { AuthServiceService } from '../../../service/auth-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  title = 'Registration!';

  course: string;
  group: string;

  studentAuth: StudentRegistr;
  showDepartmentMessage: boolean = false;

  constructor(private authService : AuthServiceService,
              private router: Router,
  )
  {
    this.studentAuth = new StudentRegistr();
    this.course = "";
    this.group = "";
  }

  ngOnInit() {
  }

  registration(): void {
    console.log("Registration User: " + this.studentAuth.fio + this.studentAuth.passwordId);
    this.authService.registration(this.studentAuth).subscribe(() => {
      alert("Проверьте почту :)");
    });
  }

  cancel(): void {
    this.router.navigate(['/login'])
  }

  courses: Array<string> = ["1", "2", "3"];
  departments: Array<string> = [];
  groups: Array<string> = [];


  courseDepartment: { [key: string]: string[] } = {
    "1": [],
    "2": ["KFA", "KMA", "KUCP"],
    "3": ["KFA", "KMA", "KUCP"],
  }

  departmentGroups: {[key: string]: {[department: string]: string[] } } = {
    "2": {
      "KFA": ["1.1", "1.2", "1.3"],
      "KMA": ["2.1"],
      "KUCP": ["3.1", "3.2"]
    },
    "3": {
      "KFA": ["1.1", "1.2", "1.3"],
      "KMA": ["2.1"],
      "KUCP": ["3.1", "3.2"]
    }
  }

  onCourseChange(selectedCourse: string): void {
    if (this.courseDepartment[selectedCourse].length === 0) {
      this.groups = ["1.1", "1.2", "1.3", "2.1", "3.1", "3.2"];
      this.departments = [];
      this.showDepartmentMessage = true;
    } else {
      this.departments = this.courseDepartment[selectedCourse];
      this.groups = [];
      this.studentAuth.departmerntName = '';
      this.studentAuth.group = '';
      this.showDepartmentMessage = false;
    }
  }

  onDepartmentChange(selectedDepartment: string): void {
    const course = this.studentAuth.course;
    this.groups = this.departmentGroups[course]?.[selectedDepartment] || [];
    this.studentAuth.group = '';
  }

}
