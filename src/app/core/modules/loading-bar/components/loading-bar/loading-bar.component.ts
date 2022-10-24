import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {
    @Input() numBars: number = 1;
    @Input() customClass: string = '';

    constructor() { }

    ngOnInit(): void {
    }

}
