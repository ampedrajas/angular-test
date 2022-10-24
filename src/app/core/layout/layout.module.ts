import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { HeaderComponent } from './components/header/header.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { PageComponent } from './components/page/page.component';

// Modules
import { LoaderModule } from '@app/core/modules/loader/loader.module';
import { LanguageSelectorModule } from '../modules/language-selector/language-selector.module';
import { ColorModeModule } from '../modules/color-mode/color-mode.module';

// Internationalisation (i18n)
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';



// AoT (Ahead-of-Time compilation).
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        HeaderComponent,
        MainLayoutComponent,
        PageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        LoaderModule,
        ReactiveFormsModule,
        FormsModule,
        LanguageSelectorModule,
        ColorModeModule,
        // i18n
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        // Material
        MatToolbarModule,
        MatTooltipModule,
        MatIconModule,
        MatMenuModule,
        MatSnackBarModule,
        MatNativeDateModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatMomentDateModule
    ]
})
export class LayoutModule { }
