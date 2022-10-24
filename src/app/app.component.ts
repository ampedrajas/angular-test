// Angular
import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';

// Services
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from './core/services/utils.service';

// Others
import { ENV } from '@env/environment';
import { CONST } from './core/constants/constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer2,
        private translateService: TranslateService,
        private utilsService: UtilsService) {
    }

    ngOnInit(): void {
        this.getLanguageOnInit();
        this.checkEnvironment();
        this.utilsService.checkColorMode();
    }

    // View environment in console when it is different to PRO
    checkEnvironment() {
        if (ENV.envName != "pro") {
            console.log("Environment: ", ENV.envName);
        }
    }

    // Get language when starting the application
    getLanguageOnInit() {
        const DEFAULT_LANG: string = CONST.internationalization.defaultLanguage;
        const AVAILABLE_LANGUAGES: any = CONST.internationalization.availableLanguages.map(lang => lang.code).join('|');
        const LANG_STORAGE: (string | null) = this.utilsService.getLanguage();
        let currentLang: string;
        if (!LANG_STORAGE) {
            const BROWSER_LANG: string = this.translateService.getBrowserLang();
            // Check if the browser language matches with available languages.
            currentLang = BROWSER_LANG.match(AVAILABLE_LANGUAGES) ? BROWSER_LANG : DEFAULT_LANG;
            // Add the language in localSotrage
            this.utilsService.setLanguage(currentLang);
            // The application uses the language stored in currentLang
            this.translateService.use(currentLang);
        } else {
            // If the value is not null, retrieves the value of the "lang" key of the localStorage
            this.translateService.use(LANG_STORAGE);
        }
        // Set the default language as fallback
        this.translateService.setDefaultLang(DEFAULT_LANG);
        // Set the tag lang of index.html
        this.renderer.setAttribute(this.document.body.parentNode, 'lang', DEFAULT_LANG);
    }

}
