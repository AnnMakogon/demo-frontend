import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/dto/UserDTO';
import { StudentServiceService } from 'src/app/service/student-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  persUser: UserDTO;

  constructor(private baseService: StudentServiceService){
    this.persUser = new UserDTO();
  }

  ngOnInit() {
    this.baseService.getPersUser().subscribe(( persUser: UserDTO) => {
      this.persUser = persUser;
    });
  }

}
