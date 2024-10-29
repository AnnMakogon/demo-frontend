import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { StudentRegistr } from 'src/app/dto/StudentRegistr';
import { User } from 'src/app/dto/User';

@Component({
  selector: 'app-saveRegistration',
  templateUrl: './saveRegistration.component.html',
  styleUrls: ['./saveRegistration.component.scss']
})
export class SaveRegistrationComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const studentData = params['id'];
      if (studentData) {
        const decodedData = JSON.parse(decodeURIComponent(studentData)) as number;
        this.confirmRegistration(decodedData);
      } else {
        this.router.navigate(['/registration']);
      }
    })
    this.router.navigate(['/login']);
  }

  confirmRegistration(data: number) {
    this.http.post<User>('http://localhost:8080/api/registr', data)
      .subscribe(response => {
        console.log(response);
        debugger;
        sessionStorage.removeItem("0");
        sessionStorage.setItem("0", JSON.stringify(response));
        this.router.navigate(['/login']);
      },
        error => {
          this.router.navigate(['/registration']);
        }
      )
  }

}
