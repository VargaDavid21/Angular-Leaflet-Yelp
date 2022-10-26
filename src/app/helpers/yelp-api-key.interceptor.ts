import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class YelpApiKeyInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${environment.yelpApiKey}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
    return next.handle(request);
  }
}
