import { Component, OnInit } from 'angular2/core';
import { BoardDirective } from './board.directive';
import { SlotComponent } from './slot.component';
import { GameService } from './game.service';
import { Slot } from './slot';

@Component({
    selector: 'sweeper',
    templateUrl: 'src/app/components/app.component.html',
    directives: [BoardDirective, SlotComponent],
    providers: [GameService]
})
export class AppComponent implements OnInit {
    
    private slots: Slot[] = [];
    private gameOverMessage : string = '';
    
    constructor(private gameService: GameService) {
        this.gameService.gameOverEmitter.subscribe((message) => {
            this.gameOverMessage += message + '\n';
            console.log(this.gameOverMessage);
        });
    };
    
    ngOnInit() {
        this.slots = this.gameService.initBoard();
    }
}
