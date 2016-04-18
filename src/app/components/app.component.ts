import {Component, OnInit} from 'angular2/core';
import {BoardDirective} from './board.directive';
import {SlotComponent} from './slot.component';

@Component({
    selector: 'sweeper',
    templateUrl: 'src/app/components/app.component.html',
    directives: [BoardDirective, SlotComponent]
})
export class AppComponent {
    
    private slots: number[] = [];
    
    ngOnInit() {
        for (var i = 0; i < 100; i++) {
            this.slots.push(0);
        }
    }
}