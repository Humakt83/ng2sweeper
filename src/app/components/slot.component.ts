import { Component, Input } from 'angular2/core';
import { GameService } from './game.service';
import { Slot } from './slot';
import { FlagDirective } from './flag.directive';

@Component({
    selector: 'slot',
    directives: [FlagDirective],
    template: `<div [flag]="slot" class="slot" (click)="clickSlot()">
                    <span *ngIf="slot.clicked">{{slot.mine ? 'X' : slot.minesNear}}</span>
                    <span *ngIf="!slot.clicked && slot.flag">F</span>&nbsp;
               </div>`                    
})
export class SlotComponent {
    
    @Input() slot: Slot;
    
    private clicked: false;
    
    constructor(private gameService: GameService) {}
    
    public clickSlot() {
        if (this.slot.clicked) {
            return;
        }
        this.slot.clicked = true;
        if (this.slot.mine) {
            this.gameService.gameOver();    
        }
    }

}
