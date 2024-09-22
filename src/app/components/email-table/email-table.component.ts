import { NewsletterWithDate } from '../../dto/NewsletterWithDate';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmailServiceService } from '../../service/email-service.service';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PutDialogEmailComponent } from '../dialog-wrappers/put-dialog-email/put-dialog-email.component';
import { PutDataDialogEmailComponent } from '../dialog-wrappers/putData-dialog-email/putData-dialog-email.component';
import { DateForChange } from '../../dto/DateForChange';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { DelDialogEditWrapperComponent } from '../dialog-wrappers/del-dialog-student/del-dialog-edit-wrapper.component';
import { Newsletter } from 'src/app/dto/Newsletter';

@Component({
  selector: 'app-emailTable',
  templateUrl: './email-table.component.html',
  styleUrls: ['./email-table.component.scss']
})
export class EmailTableComponent implements OnInit {

  pageSize: number = 10;
  pageNum: number = 0;
  column: string = "date";
  direction: string = "";
  filterValue: string = "";

  showflag: boolean;
  showStatus: boolean;

  totalDataLength: number = 0;

  pageSizeOptions: number[] = [5, 10, 25, 50];
  startIndex: number = 0;
  endIndex = this.pageSize;

  countColumn: number = 0;

  displayedColumns: string[] = ['demo-id', 'demo-subject', 'demo-text', 'demo-date', 'demo-sent', 'demo-status', 'demo-action'];

  private stompClient: any;

  ioConnection: any;
  messageContent: string = " ";

  dataSource = new MatTableDataSource<Newsletter>;

  private greeting: Newsletter;

  constructor(private route: Router,
    private emailService: EmailServiceService,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    this.showflag = false;
    this.showStatus = false;
    this.greeting = new Newsletter();
  }

  ngOnInit() {
    console.log("Email Table Component");
    this.updateData();
  }

  setshowStatus(event: any): void {
    this.showStatus = event.checked;
    this.updateData();
  }

  updateData() {
    this.emailService.getNlPage(this.pageNum, this.pageSize, this.column, this.direction, this.filterValue, this.showflag).subscribe(data => {
      data.content.forEach((nl) => {
        if (nl.sent === true) {
          nl.sent = "Successfully sent";
        } else {
          nl.sent = "Letter in queue";
        }
        if (nl.status === "INPROCESSING") {
          nl.status = "In Processing";
        } else {
          if (nl.status === "ERROR") {
            nl.status = "Error";
          } else {
            if (nl.status === "NOTSENT") {
              nl.status = "Not Sent";
            } else {
              nl.status = "Succesfully";
            }
          }
        }
      });
      this.dataSource.data = data.content.map((nl) => {
        const [datePart, timePart] = nl.date.toString().split('T');
        const [year, month, day] = datePart.split('-');
        const [hour, minute] = timePart.split(':');

        const formattedDate = `${hour}:${minute} ${day}.${month}.${year}`;

        nl.date = formattedDate;
        return nl;
      });
      this.totalDataLength = data.totalElements;
    })

  }

  sortData(sortState: Sort) {
    if (sortState.direction) {
      this.direction = sortState.direction;
      this.column = sortState.active;
    } else {
      this.direction = "";
      this.column = "date";
    }
    this.updateData();
  }

  createNewsletter(): void {
    this.route.navigate(['/newNewsletter']);

    this.updateData();
  }

  filterData(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.updateData();
  }

  changeNl(newsletter: Newsletter) {
    const dialogPutEmail = this.dialog.open(PutDialogEmailComponent, {
      width: '400px',
      data: newsletter
    });
    dialogPutEmail.afterClosed().subscribe((result: NewsletterWithDate) => {
      if (result != null) {
        console.log("puting nl with date: " + result.date);
        const resultDTO = new Newsletter();
        resultDTO.id = result.id;
        resultDTO.date = `${result.date.calendarDate} ${result.date.hour}:${result.date.minute}`;
        resultDTO.text = result.text;
        resultDTO.subject = result.subject;
        resultDTO.sent = result.sent;
        resultDTO.status = result.status;

        this.emailService.changeNl(resultDTO).subscribe(() => {
          this.updateData();
        })
      }
      this.updateData();
    })
  }

  changeDateNl(newsletter: Newsletter) {
    const dialogPutDateEmail = this.dialog.open(PutDataDialogEmailComponent, {
      width: '400px',
      data: newsletter
    });
    dialogPutDateEmail.afterClosed().subscribe((result: DateForChange) => {
      if (result != null) {
        console.log("ReDate nl with text: " + newsletter.text);
        this.emailService.changeDateNl(newsletter, result).subscribe(() => {
          this.updateData();
        })
      }
    })
  }

  deleteNl(newsletter: NewsletterWithDate) {
    const dialogDelEmail = this.dialog.open(DelDialogEditWrapperComponent, {
      width: '400px',
      data: newsletter
    });
    dialogDelEmail.afterClosed().subscribe((result: Boolean) => {
      if (result) {
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

  initializeWebSocketConnection() {
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
      this.greeting = message.payload;
      console.log('greeting received: ' + this.greeting);
    }
    this.updateData();

    return this.greeting;
  }

  navigateTo(route: string) {
    this.route.navigate([route]);
  }

}
