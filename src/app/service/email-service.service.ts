import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateForChange } from '../dto/DateForChange';
import { Page } from '../dto/Page';
import { Newsletter } from '../dto/Newsletter';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  private messUrl = "api/mail/newsletter";

  constructor(private http: HttpClient) { }

  //создание и отправка
  messNewsletter(newsletter: Newsletter): Observable<Newsletter> {
    console.log(JSON.stringify(newsletter));
    return this.http.post<Newsletter>("/api/mail/newsletter", newsletter, httpOptions).pipe();
  }

  changeNl(changingNl: Newsletter): Observable<Newsletter> {
    console.log(changingNl);
    if (changingNl.sent === "Successfully sent") {
      changingNl.sent = true;
    } else {
      changingNl.sent = false;
    }
    if (changingNl.status === "In Processing") {
      changingNl.status = "INPROCESSING";
    } else {
      if (changingNl.status === "Error") {
        changingNl.status = "ERROR";
      } else {
        if (changingNl.status === "Not Sent") {
          changingNl.status = "NOTSENT";
        } else {
          changingNl.status = "SUCCESSFULLY"
        }
      }
    }
    changingNl.date = this.convertToUTCISO8601(changingNl.date.toString());
    console.log("date for OffsetDateTime: " + changingNl.date);
    return this.http.put<Newsletter>(this.messUrl, changingNl, httpOptions).pipe();
  }

  changeDateNl(changingNl: Newsletter, newdate: DateForChange): Observable<Newsletter> {
    console.log(changingNl, newdate);
    const messUrlData = "api/mail/newsletterDate";
    const dateString = newdate.calendarDate + " " + newdate.hour + ":" + newdate.minute;
    if (changingNl.sent === "Successfully sent") {
      changingNl.sent = true;
    } else {
      changingNl.sent = false;
    }
    if (changingNl.status === "In Processing") {
      changingNl.status = "INPROCESSING";
    } else {
      if (changingNl.status === "Error") {
        changingNl.status = "ERROR";
      } else {
        if (changingNl.status === "Not Sent") {
          changingNl.status = "NOTSENT";
        } else {
          changingNl.status = "SUCCESSFULLY";
        }

      }
    }
    changingNl.date = newdate.calendarDate + " " + newdate.hour + ":" + newdate.minute;
    changingNl.date = this.convertToUTCISO8601(changingNl.date.toString());
    return this.http.put<Newsletter>(messUrlData, changingNl, httpOptions).pipe();
  }

  deletNl(id: number): Observable<Newsletter> {
    return this.http.delete<Newsletter>(this.messUrl + "/" + id.toString(), httpOptions).pipe();
  }

  getNlPage(page: Number, size: Number, column: String, direction: String, filter: String, showflag: boolean): Observable<Page<Newsletter>> {
    const params = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('column', column.toString())
      .append('direction', direction.toString())
      .append('filter', filter.toString())
      .append('showFlag', showflag);

    return this.http.get<Page<Newsletter>>(this.messUrl, { params });
  }

  convertToUTCISO8601(timeString: string): string {
    const [datePart, timePart] = timeString.split(' ');
    const [day, month, year] = datePart.split(".").map(Number);
    const [hour, minute] = timePart.split(":").map(Number);

    const localDate = new Date(year, month - 1, day, hour - 3, minute);

    return localDate.toISOString();
  }

}
