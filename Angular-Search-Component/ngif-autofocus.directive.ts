import { AfterViewInit, Directive, ElementRef } from '@angular/core';

/*
necessary if you have an input element inside an ngIf div you want to autofocus on creation (regular autofocus will work first time, but only first time)
*/

@Directive({ selector: '[ifautofocus]' })
export class IfAutofocus implements AfterViewInit {
    constructor(
        private elementRef: ElementRef
    ) {}

    ngAfterViewInit() {
        this.elementRef.nativeElement.focus();
    }
}