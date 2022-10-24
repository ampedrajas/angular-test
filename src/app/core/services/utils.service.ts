import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CONST } from '../constants/constants';


@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    private body: HTMLBodyElement;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private titleService: Title,
        private metaService: Meta,
        private router: Router) {
            this.body = document.getElementsByTagName('body')[0];
        }

    // Add class to the body of the page
    public addClassBody(className: string[]) {
        this.body.classList.add(...className);
    }

    // Remove class of the body of the page
    public removeClassBody(className: string[]) {
        this.body.classList.remove(...className);
    }

    // Add a id to the body of the page
    public addIdBody(idName: string) {
        this.body.id = idName;
    }

    // Remove the id of the body of the page
    public removeIdBody() {
        this.body.removeAttribute('id');
    }

    // Add the language in the localStorage
    public setLanguage(lang: string) {
        return localStorage.setItem(this.encodeString("lang"), lang);
    }

    // Retrieves the language we have stored in the localStorage
    public getLanguage(): string | null {
        return localStorage.getItem(this.encodeString("lang"));
    }

    // Add the locale in the localStorage
    public setLocale(locale: string) {
        return localStorage.setItem(this.encodeString("locale"), locale);
    }

    // Retrieves the locale we have stored in the localStorage
    public getLocale(): string | null {
        let locale = localStorage.getItem(this.encodeString("locale"));
        return locale;
    }

    // Validate all fields of any form
    public validateAllFields(formGroup: UntypedFormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const CONTROL = formGroup.get(field);
            if (CONTROL instanceof UntypedFormControl) {
                CONTROL.markAsTouched({ onlySelf: true });
            } else if (CONTROL instanceof UntypedFormGroup) {
                this.validateAllFields(CONTROL);
            }
        });
    }

    // Validate field of a formGroup
    public validateField(formGroup: UntypedFormGroup, control: string) {
        const CONTROL_FORM = formGroup.get(control);
        if (CONTROL_FORM instanceof UntypedFormControl) {
            CONTROL_FORM.markAsTouched({ onlySelf: true });
        }
    }

    // Set the title in the head
    public setTitle(title: string) {
        this.titleService.setTitle(title);
    }

    // Configure meta tags in the head
    public updateMetaTags(metaTags: MetaDefinition[]){
        metaTags.forEach(m=> this.metaService.updateTag(m));
    }

    // COnfigure canonical url link in the head
    public setCanonicalUrl(doc: any) {
        let canonicalLinkElement = doc.querySelector("link[rel='canonical']");
        if (!canonicalLinkElement?.getAttribute("href")) {
            // Create the element if it doesn't exist
            let link: HTMLLinkElement = doc.createElement('link');
            link.setAttribute('rel', 'canonical');
            doc.head.appendChild(link);
            link.setAttribute('href', doc.URL);
        } else {
            canonicalLinkElement.setAttribute('href', doc.URL);
        }
    }

    // Go to the home page
    public goToHomePage() {
        this.router.navigate([CONST.urls.defaultHome]);
    }
    
    // Encode string
    public encodeString(text: string) {
        return btoa(text);
    }
    
    // Decode string
    public decodeString(text: string) {
        return atob(text);
    }
    
    // Change color mode
    changeColorMode(darkMode: boolean) {
        darkMode = !darkMode;
        localStorage.setItem(this.encodeString("dark-mode"), darkMode.toString());
        if (darkMode) {
            this.document.body.setAttribute("data-color-mode", "dark");
            return darkMode;
        }
        this.document.body.removeAttribute("data-color-mode");
        
        return darkMode;
    }
    
    checkColorMode() {
        const DARK_MODE = localStorage.getItem(this.encodeString("dark-mode"));
        if ((DARK_MODE == null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) || DARK_MODE == "true") {
            this.document.body.setAttribute("data-color-mode", "dark");
            localStorage.setItem(this.encodeString("dark-mode"), "true");
        }
    }
    
    getColorMode() {
        return localStorage.getItem(this.encodeString("dark-mode")) == "true";
    }
    
    toggleText(event: Event, showText: boolean) {
        event.stopPropagation();
        
        return !showText
    }
    
}
