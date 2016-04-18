import {Component, Input} from 'angular2/core';
import {GameService} from './game.service';

@Component({
    selector: 'slot',
    template: `<div class="slot" (click)="clickSlot()"><span *ngIf="_clicked">{{content}}</span>&nbsp;</div>`
})
export class SlotComponent {
    
    @Input() content: number;
    
    private _clicked: false;
    
    constructor(private _gameService: GameService) {}
    
    public clickSlot() {
        this._clicked = true;
        if (this._gameService.isMine(this.content)) {
            this._gameService.gameOver();    
        }        
    }
    
}