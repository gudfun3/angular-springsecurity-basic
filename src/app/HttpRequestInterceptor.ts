import { Injectable } from '../../node_modules/@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '../../node_modules/@angular/common/http';
import { Observable } from '../../node_modules/rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor() { }
  
  /**
   *  Interceptor is necessary to send the header 'X-Requested-With' with every 
   *  request . if not there in the application then while logging with wrong
   * username and password the spring backend will popup inbuilt login popup
   */
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      const xhr = req.clone({
        headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
      });
      // this.sessionCheckService.resetTimer();
      return next.handle(xhr);
    }
}