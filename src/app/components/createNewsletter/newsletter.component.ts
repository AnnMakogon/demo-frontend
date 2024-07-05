import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NewsletterDTO } from 'src/app/dto/NewsletterDTO';
import { EmailTableComponent } from 'src/app/emailTable/emailTable.component';
import { EmailServiceService } from 'src/app/service/email-service.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class CreateNewsletterComponent implements OnInit {

  title = 'New Newsletter';

  newsletter: NewsletterDTO;

  date: string;

  //second: string;
  minute: string;
  hour: string;
  day: string;
  month: string;
  year: string;

  constructor( private emailService: EmailServiceService,
               private route: Router
   ) {
    this.newsletter = new NewsletterDTO();
    this.date = "";

    //this.second = "";
    this.minute = "";
    this.hour = "";
    this.day = "";
    this.month = "";
    this.year = "";
   }

  ngOnInit() {
  }

  messNewsletter():void{
    console.log("mess email");

    this.date = this.date + " " + this.hour + ":" + this.minute;
    this.newsletter.date = this.date;
    debugger;
    console.log(this.date);
    this.emailService.messNewsletter(this.newsletter).subscribe(() => {
      setTimeout(() => {
        //EmailTableComponent.updateData();
        console.log("Отправлено");
      }, this.calculateTimeDifference(this.newsletter.date) )
      //здесь через какое-то время делается updateData() зависимое от даты
     });
    this.route.navigate(['/tabs']);
  }

  calculateTimeDifference(timeString: string): number {
    const [date, time] = timeString.split(' ');
    const [day, month, year] = date.split('.');
    const [hours, minutes] = time.split(':');

    const formattedTime = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));

    const now = new Date();
    const difference = (now.getTime() - formattedTime.getTime()) / (1000 * 60);

    return Math.abs(difference);
  }

  cancel():void{
    this.route.navigate(['/tabs'])
  }

  //seconds: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
  daysOfMonth: Array<string> = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
  months: Array<string> = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  years: Array<String> = ["2024", "2025", "2026"];
  hours: Array<string> = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
  minutes: Array<string> = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];

  getDate(event: any) {
    this.date = formatDate(event.value, 'dd.MM.yyyy', 'en-US');
  }
}

