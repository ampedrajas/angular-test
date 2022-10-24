import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Internationalisation (i18n)
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory } from '@app/core/layout/layout.module';
import { ColorModeToggleComponent } from './components/color-mode-toggle/color-mode-toggle.component';

// Materials
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
    declarations: [
        ColorModeToggleComponent
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
        MatTooltipModule
    ],
    exports: [
        ColorModeToggleComponent
    ]
})
export class ColorModeModule { }
