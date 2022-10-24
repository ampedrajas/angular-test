import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleFeatureRoutingModule } from './sample-feature.routing';
import { HomeComponent } from './pages/home/home.component';

// Internationalisation (i18n)
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory } from '@app/core/layout/layout.module';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

// Components
import { HomeTableComponent } from './components/home-table/home-table.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeTableComponent
  ],
  imports: [
    CommonModule,
    SampleFeatureRoutingModule,
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
    MatTableModule,
    MatCardModule,
    MatInputModule
  ]
})
export class SampleFeatureModule { }
