import { Injectable } from 'angular2/core';

@Injectable()
export class GameService {
    
    private _mine : number = 1;
    private _empty : number = 0;
    
    initBoard() {
        let slots = [];
        for (let i = 0; i < 100; i++) {
            slots.push(this._empty);
        }
        for (let j = 0; j < 25; j++) {
            this.placeRandomMine(slots);
        }
        return slots;
    }
    
    gameOver() {
        console.log("Game Over!");
    }
    
    isMine(val: number) {
        return val === this._mine;
    }
    
    private placeRandomMine(slots) {
        let idOfMine = Math.floor(Math.random() * slots.length);
        if (slots[idOfMine] === this._empty) {
            slots[idOfMine] = this._mine;
        } else {
            this.placeRandomMine(slots);
        }
    }

}