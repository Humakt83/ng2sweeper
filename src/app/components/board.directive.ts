import {Directive, ElementRef, Input} from 'angular2/core';
@Directive({
    selector: '[sweeperBoard]'
})
export class BoardDirective {
    constructor(private el: ElementRef, private window: Window) {
        let height = window.innerHeight;
        el.nativeElement.style.height = height;
        el.nativeElement.style.maxHeight = height;
        el.nativeElement.style.width = height;
        el.nativeElement.style.maxWidth = height;
    }
}