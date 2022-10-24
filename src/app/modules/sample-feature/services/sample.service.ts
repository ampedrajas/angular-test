// Angular
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Rxjs
import { Observable } from 'rxjs';

// Others
import { ENV } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class SampleService {
    private apiUrl: string = ENV.api.url;

    constructor(
        private http: HttpClient
    ) { }

    // Get users
    public getUsers(): Observable<HttpResponse<any>> {
        const URL = `${this.apiUrl}/users`;

        return this.http.get<any>(URL, {observe: 'response'});
    }

}
