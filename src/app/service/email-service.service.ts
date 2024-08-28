
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateForChange } from '../dto/DateForChange';
import { WebsocketServiceService } from './websocket-service.service';
import { Page } from '../dto/Page';
import { Newsletter } from '../dto/Newsletter';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  private messUrl = "api/mail/newsletter";

  constructor( private http: HttpClient,
                private webSocketService: WebsocketServiceService
   ) { }

  //создание и отправка
  messNewsletter(newsletter: Newsletter): Observable<Newsletter>{
    console.log(JSON.stringify(newsletter));
    return this.http.post<Newsletter>("/api/mail/newsletter", newsletter, { headers: { 'Content-Type': 'application/json' } }).pipe();
  }

  changeNl(changingNl: Newsletter): Observable<Newsletter> {
    console.log(changingNl);
    if(changingNl.sent === "Successfully sent" ){
      changingNl.sent = true;
    }else{
      changingNl.sent = false;
    }
    if(changingNl.status === "In Processing" ){
      changingNl.status = "INPROCESSING";
    }else{
      if(changingNl.status === "Error"){
        changingNl.status = "ERROR";
      } else {
        changingNl.status = "SUCCESSFULLY"
      }
    }
    return this.http.put<Newsletter>(this.messUrl, changingNl, { headers: { 'Content-Type': 'application/json' } }).pipe();
  }

  changeDateNl(changingNl: Newsletter, newdate: DateForChange): Observable<Newsletter> {
    console.log(changingNl, newdate);
    const messUrlData = "api/mail/newsletterDate";
    const dateString = newdate.calendarDate + " " + newdate.hour + ":" + newdate.minute;
    if(changingNl.sent === "Successfully sent" ){
      changingNl.sent = true;
    }else{
      changingNl.sent = false;
    }
    if(changingNl.status === "In Processing" ){
      changingNl.status = "INPROCESSING";
    }else{
      if(changingNl.status === "Error"){
        changingNl.status = "ERROR";
      } else {
        changingNl.status = "SUCCESSFULLY"
      }
    }
    changingNl.date = newdate.calendarDate + " " + newdate.hour + ":" + newdate.minute;
    return this.http.put<Newsletter>(messUrlData, changingNl /*{id: changingNl.id, date: dateString, text: changingNl.text, subject: changingNl.subject, sent: changingNl.sent, status: changingNl.status }*/).pipe(); //здесь changingNl.status = "Delivered"
  }

  deletNl(id: number): Observable<Newsletter>{
    return this.http.delete<Newsletter>(this.messUrl + "/" + id.toString()).pipe();
  }

  getNlPage(page: Number, size: Number, column: String, direction: String, filter: String, showflag: boolean): Observable<Page<Newsletter>>{
  /*getNlPagSortFilter(forGet: ForGet): Observable<NewsletterDTO[]>{
    let params = new HttpParams();
    for (const key in forGet) {
      if (forGet.hasOwnProperty(key)) {
        params = params.set(key, (forGet as any)[key]);
      }
    }*/
    const params = new HttpParams()
              .append('page', page.toString())
              .append('size', size.toString())
              .append('column', column.toString())
              .append('direction', direction.toString())
              .append('filter', filter.toString())
              .append('showFlag', showflag);

    return this.http.get<Page<Newsletter>>(this.messUrl, {params});
  }


}
