import { Injectable } from '../../node_modules/@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '../../node_modules/@angular/common/http';
import { Observable } from '../../node_modules/rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor() { }
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      const xhr = req.clone({
        headers: req.headers.set('X-Requested-With', 'XMLHttpRequest'),
        withCredentials: true
      });
      // this.sessionCheckService.resetTimer();
      return next.handle(xhr);
    }
}