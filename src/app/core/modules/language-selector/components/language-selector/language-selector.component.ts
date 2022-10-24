import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { CONST } from '@app/core/constants/constants';
import { LanguageModel } from '@app/core/models/language.model';
import { UtilsService } from '@app/core/services/utils.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
    public availableLangs: LanguageModel[] = CONST.internationalization.availableLanguages;
    public currentLangCode: string;
    public currentLang: (LanguageModel | undefined);

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private dateAdapter: DateAdapter<any>,
        private renderer: Renderer2,
        private translate: TranslateService,
        private utilsService: UtilsService) {
        this.currentLangCode = this.utilsService.getLanguage() ? this.utilsService.getLanguage()! : CONST.internationalization.defaultLanguage;
        this.currentLang = this.availableLangs.find(item => item.code == this.currentLangCode);
    }

    ngOnInit(): void {
    }

    // Change language
    changeLang(lang: LanguageModel) {
        this.translate.use(lang.code);
        this.utilsService.setLanguage(lang.code);
        this.currentLang =  this.availableLangs.find(item => item.code == lang.code);
        this.setLocale(lang);
        // Change the tag lang of the html
        this.renderer.setAttribute(this.document.body.parentNode, 'lang', lang.code);
    }

    // Set locale (to change the format of the mat-datepicker)
    setLocale(lang: LanguageModel) {
        this.dateAdapter.setLocale(lang.locale);
        // Store the locale in localStorage to date pipe in templates
        this.utilsService.setLocale(lang.locale);
    }

}
