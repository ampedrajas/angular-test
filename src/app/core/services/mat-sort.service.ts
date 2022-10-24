// Angular
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MatSortService {

    constructor() { }

    // Elimina las tildes de una palabra
    public removeAccentMarks(text: string) {
        const ACCENT_MARKS: any = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
        return text.split('').map( letter => ACCENT_MARKS[letter] || letter).join('').toString();
    }

}
