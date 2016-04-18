import {Component, OnInit} from 'angular2/core';
import {BoardDirective} from './board.directive';
import {SlotComponent} from './slot.component';
import {GameService} from './game.service';

@Component({
    selector: 'sweeper',
    templateUrl: 'src/app/components/app.component.html',
    directives: [BoardDirective, SlotComponent],
    providers: [GameService]
})
export class AppComponent {
    
    private slots: number[] = [];
    
    constructor(private _gameService: GameService) {};
    
    ngOnInit() {
        this.slots = this._gameService.initBoard();
    }
}