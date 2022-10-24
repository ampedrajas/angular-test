import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private utilsService: UtilsService) { }

    // Get token of the localStorage
    public getToken(): string | null {
        return localStorage.getItem(this.utilsService.encodeString('token'));
    }

    // Set token in the localStorage
    public setToken(value: string) {
        return localStorage.setItem(this.utilsService.encodeString('token'), value);
    }

    // Get refresh token of the localStorage
    public getRefreshToken(): string | null {
        return localStorage.getItem(this.utilsService.encodeString('refreshToken'));
    }

    // Set refresh token in the localStorage
    public setRefreshToken(value: string) {
        return localStorage.setItem(this.utilsService.encodeString('refreshToken'), value);
    }

    // Remove token from localStorage
    public removeToken() {
        return localStorage.removeItem(this.utilsService.encodeString('token'));
    }

    // Remove refresh token from localStorage
    public removeRefreshToken() {
        return localStorage.removeItem(this.utilsService.encodeString('refreshToken'));
    }

    // Check if the user is logged-in
    public userIsLoggedIn() {
        return this.getToken() ? true : false ;
    }
    
    // Clean storage
    public cleanStorage() {
        this.removeToken();
        // Add keys to clean the storage (don't clean the language)
    }

}
