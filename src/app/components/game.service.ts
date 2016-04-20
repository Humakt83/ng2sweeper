import { Injectable } from 'angular2/core';
import { Slot } from './slot';

@Injectable()
export class GameService {
    
    private boardSize = 100;
    private amountOfMines = 25;
    
    initBoard() {
        let slots = [];
        for (let i = 0; i < this.boardSize; i++) {            
            slots.push(new Slot(false, 0));
        }
        for (let j = 0; j < this.amountOfMines; j++) {
            this.placeRandomMine(slots);
        }
        this.countMinesNear(slots);
        return slots;
    }
    
    gameOver() {
        console.log("Game Over!");
    }
    
    private placeRandomMine(slots: Slot[]) {
        let idOfMine = Math.floor(Math.random() * slots.length);
        if (!slots[idOfMine].mine) {
            slots[idOfMine] = new Slot(true, 0);
        } else {
            this.placeRandomMine(slots);
        }
    }
    
    private countMinesNear(slots: Slot[]) {
        for (let i = 0; i < slots.length; i++) {
            let slotOnLeftSide = i % 10 === 0;
            let slotOnRightSide = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99].indexOf(i) >= 0;
            let minesNear = !slotOnLeftSide && this.isInsideBoard(i - 1) && slots[i - 1].mine ? 1 : 0;
            minesNear += !slotOnRightSide && this.isInsideBoard(i + 1) && slots[i + 1].mine ? 1 : 0;
            let aboveSlot = i - 10;
            let belowSlot = i + 10;
            minesNear += this.isInsideBoard(aboveSlot) && slots[aboveSlot].mine ? 1 : 0;
            minesNear += !slotOnRightSide && this.isInsideBoard(aboveSlot + 1) && slots[aboveSlot + 1].mine ? 1 : 0;
            minesNear += !slotOnLeftSide && this.isInsideBoard(aboveSlot - 1) && slots[aboveSlot - 1].mine ? 1 : 0;
            minesNear += this.isInsideBoard(belowSlot) && slots[belowSlot].mine ? 1 : 0;
            minesNear += !slotOnRightSide && this.isInsideBoard(belowSlot + 1) && slots[belowSlot + 1].mine ? 1 : 0;
            minesNear += !slotOnLeftSide && this.isInsideBoard(belowSlot - 1) && slots[belowSlot - 1].mine ? 1 : 0;
            slots[i].minesNear = minesNear;
        }
    }
    
    private isInsideBoard(index : number) {
        return index >= 0 && index < this.boardSize;    
    }

}