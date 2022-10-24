import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '@app/core/services/loader.service';

@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
    private routesNotInterceptables = [];

    // Check requests that shouldn't be intercepted (e.g. API calls in ngOnInit(), this fixes ExpressionChangedAfterItHasBeenCheckedError).
    private urlNotIntercept(url: string) {
        return this.routesNotInterceptables.some(data => {
            return url.includes(data);
        });
    }

    constructor(
        public loaderService: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.urlNotIntercept(req.url)) {
            return next.handle(req);
        }
        this.loaderService.show();
        return next.handle(req)
            .pipe(
                finalize(() => this.loaderService.hide())
            );
    }

}
