import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Error401InterceptorService implements HttpInterceptor{

  constructor(private route: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if ([401].includes(err.status)) {
        this.route.navigate(['/login']);
        alert("Ошибка 401");
      }
      if ([691].includes(err.status)) {
        this.route.navigate(['/login']);
        alert("Неверное Имя или Пароль");
      }

      const error = err.error?.message || err.statusText;
      console.log(err);
      return throwError(() => error)
    }))
  }

}
