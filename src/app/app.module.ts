import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import localeEs from '@angular/common/locales/es';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { CONST } from './core/constants/constants';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { LayoutModule } from '@app/core/layout/layout.module';

registerLocaleData(localeEs, 'es');

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule
    ],
    providers: [
        // Interceptors
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
        {
        provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterceptor,
        multi: true
        },
        // Options of Material Snackbar (toast)
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 5000,
                verticalPosition: 'top'
            }
        },
        // Locale (for translate the mat-datepicker)
        {
            provide: LOCALE_ID,
            useValue: CONST.localization.code
        },
        // Title (service to translate the page title)
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
