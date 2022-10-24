// Angular
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';

// Services
import { UtilsService } from '@app/core/services/utils.service';

// Others
import { CONST } from '@app/core/constants/constants';

@Component({
    selector: 'page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
    public idBody: string;
    public classBody: string[] = [];
    public pageTitle!: string;
    public pageDescription!: string;
    public coverImageUrl!: string;
    public metaTags: MetaDefinition[] = [];
    private appName = CONST.app.name;

    constructor(
        public elem: ElementRef,
        public utilsService: UtilsService,
        @Inject(DOCUMENT) public document: Document
    ) {
        this.idBody = elem.nativeElement.localName;
    }

    ngOnInit(): void {
        this.setSelectorToBody();
        this.setMetaTags();
        this.setSeo();
    }

    ngOnDestroy(): void {
       this.removeSelectorToBody();
    }

    // Add id and class to the body tag
    setSelectorToBody() {
        // Add id to the body tag
        this.utilsService.addIdBody(this.idBody);
        // Add class to the body tag
        if (this.classBody.length > 0) {
            this.utilsService.addClassBody(this.classBody);
        }
    }

    // Remove id and class to the body tag
    removeSelectorToBody() {
        // Remove id to the body tag
        this.utilsService.removeIdBody();
        // Remove class to the body tag
        if (this.classBody.length > 0) {
            this.utilsService.removeClassBody(this.classBody);
        }
    }

    setMetaTags() {
        this.metaTags = [
            { name: "description", content: this.pageDescription },
            // Open Graph
            { property: "og:title", content: this.pageTitle },
            { property: "og:description", content: this.pageDescription },
            // { property: "og:image", content: `${this.document.location.origin}/${this.coverImageUrl} `}, // TODO Poner imagen por defecto por si no se le pasa ninguna o da error 404
            { property: "og:url", content: this.document.URL },
            // Twitter
            { name: "twitter:title", content: this.pageTitle },
            { name: "twitter:description", content: this.pageDescription },
            // { name: "twitter:image", content: `${this.document.location.origin}/${this.coverImageUrl}` }, // TODO Poner imagen por defecto por si no se le pasa ninguna o da error 404
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:url", content: this.document.URL },
        ];
    }

    // Set SEO values in head
    setSeo() {
        // Set meta title
        let title: string = `${this.pageTitle} - ${this.appName}`;
        this.utilsService.setTitle(title);
        // Set meta tags
        this.utilsService.updateMetaTags(this.metaTags);
        // Set canonical Url
        this.utilsService.setCanonicalUrl(this.document);
    }

}
