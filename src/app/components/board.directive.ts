import {Directive, ElementRef, Input, Renderer} from 'angular2/core';
@Directive({
    selector: '[board]',
})
export class BoardDirective {
    constructor(private el: ElementRef, private window: Window, private renderer: Renderer) {
        let height = window.innerHeight + 'px';
        let native = el.nativeElement;
        renderer.setElementStyle(native, 'height', height);
        renderer.setElementStyle(native, 'maxHeight', height);
        renderer.setElementStyle(native, 'width', height);
        renderer.setElementStyle(native, 'maxWidth', height);
    }
}
