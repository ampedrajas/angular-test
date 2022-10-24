import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ENV } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorsHandlerService {

  private typeErrors?: Array<any> = undefined;

    constructor(
        private translateService: TranslateService,
        private snackBarService: MatSnackBar) {
        }

    // Create a list with error codes
    generateTypeErrors() {
        this.typeErrors = [
            // Código de ejemplo, hay que eliminarlo
            { codeApi: 'ExampleCode', codeTranslate: this.translateService.instant('ERROR.EXAMPLE_DESCRIPTION'), action: ''},
        ];
    }

    // Open snackbar
    openSnackBar(mainText: string) {
        this.snackBarService.open(
            mainText,
            this.translateService.instant('GLOBAL.OK'),
            { panelClass: 'error-snackbar' }
        );
    }

    // HTTP Error handler
    manageErrorHandler(statusError: any, statusErrorMsg?: any) {
        if (!this.typeErrors) {
            this.generateTypeErrors();
        }
        switch (statusError) {
            case 400:
                this.openSnackBar(this.translateService.instant('ERROR.USER_PASSWORD_ERROR'));
                break;
            case 401:
                this.openSnackBar(this.translateService.instant('ERROR.NO_AUTHENTICATED'));
                // If we want to logout, we need to call to logout() function
                break;
            case 412:
                this.openSnackBar(this.translateService.instant('ERROR.NO_HEADERS_PARAMETERS'));
                break;
            case 422:
                // Search the error to get de translated text
                const TYPE_ERROR = this.typeErrors?.find(item => item.codeApi === statusErrorMsg);
                if (TYPE_ERROR) {
                    this.openSnackBar(TYPE_ERROR.codeTranslate);
                    // Add custom actions (if there is more than one action, change to "switch/case")
                    // For instance:
                    // if (TYPE_ERROR.action == 'logOut') {
                    //      this.authService.logOut();
                    // }
                } else {
                    if (ENV.envName === 'dev') {
                        this.snackBarService.open(
                        'Error: ' + this.translateService.instant('ERROR.UNKNOWN_CASE') + ' ' + statusError,
                        this.translateService.instant('GLOBAL.OK'),
                        { panelClass: 'error-snackbar'}
                        );
                    } else {
                        this.openSnackBar(this.translateService.instant('ERROR.SERVICE_NOT_AVAILABLE'));
                    }
                }
                break;
            case 500:
                this.openSnackBar(this.translateService.instant('ERROR.SERVICE_NOT_AVAILABLE'));
                break;
            default:
                if (ENV.envName === 'dev') {
                    this.snackBarService.open(
                        'Error: ' + this.translateService.instant('ERROR.UNKNOWN_CASE') + ' ' + statusError,
                        this.translateService.instant('GLOBAL.OK'),
                        { panelClass: 'error-snackbar'}
                    );
                } else {
                    this.openSnackBar(this.translateService.instant('ERROR.SERVICE_NOT_AVAILABLE'));
                }
                break;
        }
    }

    // Llama a la función de control de errores
    errorHandler(error: any) {
        if ( error instanceof HttpErrorResponse) {
        const STATUS = error.status;
            if (STATUS === 422) {
                const STATUS_ERROR_MSG = error.error.message;
                this.manageErrorHandler(STATUS, STATUS_ERROR_MSG);
            } else {
                this.manageErrorHandler(STATUS);
            }
        } else {
            if (error.name === 'TimeoutError') {
                this.openSnackBar(this.translateService.instant('ERROR.SERVICE_NOT_AVAILABLE'));
            }
        }
    }
}
