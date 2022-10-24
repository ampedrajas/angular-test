import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '@app/core/services/utils.service';

@Component({
    selector: 'main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

    constructor(public utilsService: UtilsService, private router: Router) { }

    ngOnInit(): void {
        this.router.navigate(['/home']);
    }
}
