import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '@app/core/services/loader.service';


@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
    public isLoading!: Subject<boolean>;

    constructor(
        private loaderService: LoaderService) {
        }

    ngOnInit() {
        this.isLoading = this.loaderService.isLoading;
    }

}
