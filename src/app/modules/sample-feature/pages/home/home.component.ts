// Angular
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject } from '@angular/core';

// Components
import { PageComponent } from '@app/core/layout/components/page/page.component';

// Services
import { UtilsService } from '@app/core/services/utils.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent extends PageComponent {

    constructor(
        public elem: ElementRef,
        public utilsService: UtilsService,
        @Inject(DOCUMENT) public document: Document,
        private translateService: TranslateService
    ) {
        super(elem, utilsService, document);
        this.idBody = elem.nativeElement.localName;
        // SEO
        this.pageTitle = this.translateService.instant("SEO.HOME.TITLE");
        this.pageDescription = this.translateService.instant("SEO.HOME.DESCRIPTION");
    }

}
