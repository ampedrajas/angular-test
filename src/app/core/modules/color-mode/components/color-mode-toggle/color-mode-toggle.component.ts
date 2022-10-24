import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from '@app/core/services/utils.service';

@Component({
    selector: 'color-mode-toggle',
    templateUrl: './color-mode-toggle.component.html',
    styleUrls: ['./color-mode-toggle.component.scss']
})
export class ColorModeToggleComponent implements OnInit {
    @Input() darkMode!: boolean;
    @Output() isDarkMode = new EventEmitter<boolean>();
    
    constructor(private utilsService: UtilsService) { }

    ngOnInit(): void {
    }
    
    toggleColorMode() {
        this.darkMode = this.utilsService.changeColorMode(this.darkMode);
        this.isDarkMode.emit(this.darkMode);
    }

}
