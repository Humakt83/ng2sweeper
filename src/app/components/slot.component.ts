import {Component, Input} from 'angular2/core';

@Component({
    selector: 'slot',
    template: `<div class="slot">{{content}}</div>`
})
export class SlotComponent {
    
    @Input() content: number;
    
}