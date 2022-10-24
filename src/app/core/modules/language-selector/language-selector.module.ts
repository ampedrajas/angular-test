import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Internationalisation (i18n)
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory } from '@app/core/layout/layout.module';

// Components
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

// Material
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
    declarations: [
        LanguageSelectorComponent
    ],
    imports: [
        CommonModule,
        // i18n
        HttpClientModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        // Material
        MatMenuModule
    ],
    exports: [
        LanguageSelectorComponent
    ]
})
export class LanguageSelectorModule { }
