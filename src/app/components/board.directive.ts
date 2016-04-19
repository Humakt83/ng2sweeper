import {Directive, ElementRef, Input, Renderer} from 'angular2/core';
@Directive({
    selector: '[board]',
})
export class BoardDirective {
    constructor(public el: ElementRef, public window: Window, public renderer: Renderer) {
        let height = window.innerHeight;
        let native = el.nativeElement;
        renderer.setElementStyle(native, 'height', height);
        renderer.setElementStyle(native, 'maxHeight', height);
        renderer.setElementStyle(native, 'width', height);
        renderer.setElementStyle(native, 'maxWidth', height);
    }
}
