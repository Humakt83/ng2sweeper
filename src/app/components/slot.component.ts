import {Component, Input} from 'angular2/core';
import {GameService} from './game.service';
import {Slot} from './slot';

@Component({
    selector: 'slot',
    template: `<div class="slot" (click)="clickSlot()"><span *ngIf="clicked">{{content.mine ? 'x' : content.minesNear}}</span>&nbsp;</div>`
})
export class SlotComponent {
    
    @Input() content: Slot;
    
    private clicked: false;
    
    constructor(private gameService: GameService) {}
    
    public clickSlot() {
        this.clicked = true;
        if (this.content.mine) {
            this.gameService.gameOver();    
        }
    }
    
}