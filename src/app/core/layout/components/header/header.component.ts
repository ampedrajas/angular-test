import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { CONST } from '@app/core/constants/constants';
import { LanguageModel } from '@app/core/models/language.model';
import { AuthService } from '@app/core/services/auth.service';
import { UtilsService } from '@app/core/services/utils.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public availableLangs: LanguageModel[] = CONST.internationalization.availableLanguages;
    public currentLangCode: string;
    public currentLang: (LanguageModel | undefined);
    public showMenu: boolean = false;
    public darkMode!: boolean;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private dateAdapter: DateAdapter<any>,
        private translateService: TranslateService,
        private utilsService: UtilsService,
        private router: Router,
        private renderer: Renderer2,
        private authService: AuthService) {
            this.currentLangCode = this.utilsService.getLanguage() ? this.utilsService.getLanguage()! : CONST.internationalization.defaultLanguage;
            this.currentLang = this.availableLangs.find(item => item.code == this.currentLangCode);
            if (this.currentLang) {
                this.setLocale(this.currentLang);
            }
            // Set the tag lang of the html
            this.renderer.setAttribute(this.document.body.parentNode, 'lang', this.currentLangCode);
        }
    
    ngOnInit(): void {
        this.checkColorMode();
    }

    // Set locale (to change the format of the mat-datepicker)
    setLocale(lang: LanguageModel) {
        this.dateAdapter.setLocale(lang.locale);
        // Store the locale in localStorage to date pipe in templates
        this.utilsService.setLocale(lang.locale);
    }

    // Log out
    logOut() {
        this.authService.cleanStorage();
        this.router.navigate(['']);
    }

    // Toggle menu when the user click in hamburger icon
    toggleMenu() {
        this.showMenu = !this.showMenu;
        // If showMenu is true the scroll of the body will be disabled
        if (this.showMenu) {
            this.utilsService.addClassBody(["hidden-overflow"]);
        } else {
            this.utilsService.removeClassBody(['hidden-overflow']);
        }
    }

    // When click in a link, hide the menu and remove the class hidden-overflow (this class exists to avoid the scroll in the offcanvas menu)
    hideMenu() {
        this.showMenu = false;
        this.utilsService.removeClassBody(['hidden-overflow']);
    }
    
    checkColorMode() {
        const DARK_MODE = localStorage.getItem(this.utilsService.encodeString("dark-mode")) == "true";
        this.darkMode = DARK_MODE ? true : false;
    }
    
    updateColorMode(darkMode: boolean) {
        this.darkMode = darkMode;
    }


}
