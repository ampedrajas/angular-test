import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { AuthService } from '@app/core/services/auth.service';
import { CONST } from '@app/core/constants/constants';
import { ErrorsHandlerService } from '../services/errors-handler.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private folderNotInterceptable = ["/assets/i18n/"];
    private urlNoToken = [];

    constructor(
        private injector: Injector) {}

    // Check if requests that shouldn't be intercepted (e.g. language JSON).
    private urlNotIntercept(url: string) {
        return this.folderNotInterceptable.some(data => {
            return url.includes(data);
        });
    }

    // Check if a URL doesn't require a token
    private noNeedToken(url: string){
        return this.urlNoToken.some(el => {
            return url.indexOf(el) !== -1;
        });
    }

    // Return timeout value of constant
    private getTimeOut() {
        const TIME_OUT = CONST.api.timeout;

        return TIME_OUT;
    }

    // Interceptor (token is added if it's neccesary and the timeout is configured)
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authService = this.injector.get(AuthService); // To avoid circular dependency
        const TOKEN = authService.getToken();

        let clonedRequest: HttpRequest<any>;
        if (this.urlNotIntercept(request.url)) {
            return next.handle(request);
        } else if (TOKEN && !this.noNeedToken(request.url)) {
            // If the request is intercepted, the headers are added to it
            clonedRequest = request.clone({ headers: request.headers.set( 'Authorization', `Bearer ${TOKEN}`) });
        } else {
            clonedRequest = request.clone();
        }

        const API_TIME_OUT = this.getTimeOut();

        return next.handle(clonedRequest).pipe(
            timeout(API_TIME_OUT),
            catchError((error: any) => {
                if (error instanceof HttpErrorResponse) {
                    // To avoid circular dependency
                    let errorHandler = this.injector.get(ErrorsHandlerService);
                    // Call to errorHandler for show error in screen
                    errorHandler.errorHandler(error);
                }
                return throwError(() => error);
            })
        );
    }

}
