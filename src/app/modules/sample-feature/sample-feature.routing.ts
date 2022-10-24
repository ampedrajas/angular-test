import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoAuthGuard } from '@app/core/guards/no-auth.guard';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
  exports: [RouterModule]
})
export class SampleFeatureRoutingModule { }
