import { Directive, Input } from 'angular2/core';
import { Slot } from './slot';
import { GameService } from './game.service';

@Directive({
    selector: '[flag]',
    host: {
        '(contextmenu)': 'toggleFlag($event)'
    }
})
export class FlagDirective {
    
    @Input('flag') slot : Slot;
    
    constructor(private gameService : GameService) {};
    
    toggleFlag(event: MouseEvent) {
        event.preventDefault();
        this.slot.toggleFlag();
        this.gameService.checkForVictory();
    }
    
}
