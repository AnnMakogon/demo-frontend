import { NewsletterDTO } from 'src/app/dto/NewsletterDTO';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateForChangeDto } from '../dto/DateForChangeDTO';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {
  static update() {
    throw new Error('Method not implemented.');
  }

  private messUrl = "api/mail/newsletter";

  constructor( private http: HttpClient ) { }

  //создание и отправка
  messNewsletter(newsletter: NewsletterDTO): Observable<NewsletterDTO>{
    console.log("mess newsletter");
    debugger;
    return this.http.post<NewsletterDTO>(this.messUrl, newsletter, { headers: { 'Content-Type': 'application/json' } }).pipe();
  }

  changeNl(changingNl: NewsletterDTO/*, id: any*/): Observable<NewsletterDTO> {
    console.log("change this nl");
    //id = Number(id);
    return this.http.put<NewsletterDTO>(this.messUrl, {id: changingNl.id, date: changingNl.date, address: changingNl.address, text: changingNl.text, subject: changingNl.subject, mess: changingNl.mess, status: changingNl.status }, httpOptions).pipe();
  }

  changeDateNl(changingNl: NewsletterDTO, newdate: DateForChangeDto): Observable<NewsletterDTO> {
    console.log("change date of this nl");
    /*const id = Number(changingNl.id);
    let params = new HttpParams()
      .append('chNl', id.toString())
      .append('date', newdate);*/
    const messUrlData = "api/mail/newsletterDate";
    debugger
    const dateString = newdate.calendarDate + " " + newdate.minute + ":" + newdate.hour;
    return this.http.put<NewsletterDTO>(messUrlData, {id: changingNl.id, date: dateString, address: changingNl.address, text: changingNl.text, subject: changingNl.subject, mess: changingNl.mess, status: changingNl.status }).pipe();
  }

  deletNl(id: number): Observable<NewsletterDTO>{

    return this.http.delete<NewsletterDTO>(this.messUrl + "/" + id.toString()).pipe();
  }

  getNlPagSortFilter(page: Number, size: Number, column: String, direction: String, filter: String, showflag: boolean): Observable<NewsletterDTO[]>{
    let params = new HttpParams()
              .append('page', page.toString())
              .append('size', size.toString())
              .append('column', column.toString())
              .append('direction', direction.toString())
              .append('filter', filter.toString())
              .append('showflag', showflag);

    return this.http.get<NewsletterDTO[]>(this.messUrl, {params});
  }

  getFullLength(filter: String, showflag: boolean): Observable<number>{
    let params = new HttpParams()
              .append('filter', filter.toString())
              .append('showflag', showflag);
    return this.http.get<number>('api/mail/length',{params});
  }


}
