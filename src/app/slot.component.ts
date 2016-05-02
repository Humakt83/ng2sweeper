import { Component, Input } from 'angular2/core';
import { GameService } from './game.service';
import { Slot } from './slot';
import { FlagDirective } from './flag.directive';

@Component({
    selector: 'slot',
    directives: [FlagDirective],
    template: `<div [flag]="slot" class="slot" [class.slotClicked]="slot.clicked" (click)="clickSlot()">
                <span *ngIf="slot.clicked && !slot.mine">{{slot.minesNear > 0 ? slot.minesNear : ''}}</span>
                    <div class="bomb" *ngIf="slot.clicked && slot.mine"></div>
                    <div class="flag" *ngIf="!slot.clicked && slot.flag"></div>&nbsp;
               </div>`                    
})
export class SlotComponent {
    
    @Input() slot: Slot;
        
    constructor(private gameService: GameService) {}
    
    public clickSlot() {
        if (this.slot.clicked) {
            return;
        }
        this.slot.clicked = true;
        if (this.slot.mine) {
            this.gameService.gameOver();    
        } else if (this.slot.minesNear === 0) {
            this.gameService.turnEmptySlots(this.slot.id);
        }
    }

}
