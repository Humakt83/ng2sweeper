import { Directive, Input } from 'angular2/core';
import { Slot } from './slot';

@Directive({
    selector: '[flag]',
    host: {
        '(contextmenu)': 'toggleFlag($event)'
    }
})
export class FlagDirective {
    
    @Input('flag') slot : Slot;
    
    toggleFlag(event: MouseEvent) {
        event.preventDefault();
        this.slot.toggleFlag();
    }
    
}
