import { Newsletter } from './../models/newsletter';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NewsletterDTO } from '../dto/NewsletterDTO';
import { EmailServiceService } from '../service/email-service.service';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PutDialogEmailComponent } from '../components/dialog-wrappers/put-dialog-email/put-dialog-email.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PutDataDialogEmailComponent } from '../components/dialog-wrappers/putData-dialog-email/putData-dialog-email.component';
import { DateForChangeDto } from '../dto/DateForChangeDTO';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { DelDialogEditWrapperComponent } from '../components/dialog-wrappers/del-dialog-student/del-dialog-edit-wrapper.component';
import { WebsocketServiceService } from '../service/websocket-service.service';


@Component({
  selector: 'app-emailTable',
  templateUrl: './emailTable.component.html',
  styleUrls: ['./emailTable.component.scss']
})
export class EmailTableComponent implements OnInit {

  pageSize: number = 10;
  pageNum: number = 0;
  column: String = "id";
  direction: String = "";
  filterValue: String = "";

  showflag: boolean;
  showStatus: boolean;

  totalDataLength: number = 0;

  pageSizeOptions: number[] = [5, 10, 25, 50];
  startIndex: number = 0;
  endIndex = this.pageSize;

  countColumn: number = 0;

  displayedColumns: string[] = ['demo-id', 'demo-subject', 'demo-text', 'demo-date', 'demo-mess', 'demo-status', 'demo-action' ];

  private stompClient: any;

  ioConnection: any;
  messageContent: string = " ";

  dataSource = new MatTableDataSource<NewsletterDTO>;

  private greeting: NewsletterDTO;

  constructor(private route: Router,
              private emailService: EmailServiceService,
              public dialog: MatDialog,
              private socketService: WebsocketServiceService) {
    this.dataSource = new MatTableDataSource();
    this.showflag = false;
    this.showStatus = false;
    this.greeting = new NewsletterDTO();
  }

  ngOnInit() {
    console.log ("Email Table Component");
    //this.emailService.getNlPagSortFilter.subscribe(() => {});
    //this.initIoConnection();
    this.updateData();
    this.socketService.message.subscribe(() =>{
      this.updateData();
    })
    //this.initializeWebSocketConnection();
  }

  /*private initIoConnection(): void{
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: NewsletterDTO) => {
        //this.messages.push(message);}//здесь добавление в массив
      })

      this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }*/

  setshowStatus(event: any):void{
    this.showStatus = event.checked;
    this.updateData();
  }

  updateData(){
    this.emailService.getFullLength(this.filterValue, this.showflag).subscribe((length: number) => {
      this.totalDataLength = length;
    })

    this.emailService.getNlPagSortFilter(this.pageNum, this.pageSize, this.column, this.direction, this.filterValue, this.showflag).subscribe( data => {
      this.dataSource.data = data;
    })
  }

  sortData( sortState: Sort ){
    if (sortState.direction) {
      this.direction = sortState.direction;
      this.column = sortState.active;
    } else {
      this.direction = "";
      this.column = "date";
    }
    this.updateData();
  }

  newNewsletter():void {
    this.route.navigate(['/newNewsletter']);
    this.updateData();
  }

  filterData( event: Event ) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.updateData();
  }

  updateEmail(newsletter: NewsletterDTO){
    const dialogPutEmail = this.dialog.open(PutDialogEmailComponent, {
      width: '400px',
      data: newsletter
    });
    dialogPutEmail.afterClosed().subscribe((result : NewsletterDTO) => {
      if(result != null) {
        console.log("puting nl with text: " + newsletter.text);
        this.emailService.changeNl(result/*, newsletter.id*/).subscribe(() => {
          this.updateData();
        })
      }
    })
  }

  changeDateNl(newsletter: NewsletterDTO){
    const dialogPutDateEmail = this.dialog.open(PutDataDialogEmailComponent, {
      width: '400px',
      data: newsletter
    });
    dialogPutDateEmail.afterClosed().subscribe((result : DateForChangeDto) => {
      debugger;
      if(result != null) {
        console.log("ReDate nl with text: " + newsletter.text);
        this.emailService.changeDateNl(newsletter, result).subscribe(() => {
          this.updateData();
        })
      }
    })
  }

  deleteEmail(newsletter: Newsletter){
    const dialogDelEmail = this.dialog.open(DelDialogEditWrapperComponent, {
      width: '400px',
      data: newsletter
    });
    dialogDelEmail.afterClosed().subscribe((result : Boolean) => {
      if(result){
        console.log("delete nl");
        const id = Number(newsletter.id);
        this.emailService.deletNl(id).subscribe(() => {
          this.updateData();
        });
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.pageNum = event.pageIndex;
    this.pageSize = event.pageSize;
    this.totalDataLength = event.length;
    this.updateData();
  }

  initializeWebSocketConnection(){
    const serverUrl = 'ws://localhost:8080/websocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/newsletterSend', () => {
        this.updateData();
      })
    })
  }

  public setMess(event: MessageEvent): any {
    const message = JSON.parse(event.data);
      if (message.channel === '/topic/greetings') {
        this.greeting = message.payload; // Сохранение ответа в поле класса
        console.log('greeting received: ', this.greeting);
      }
      this.updateData();

    return this.greeting;
  }

}
