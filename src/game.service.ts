import { Injectable, EventEmitter } from 'angular2/core';
import { Slot } from './slot';

@Injectable()
export class GameService {
    
    private boardSize = 100;
    private amountOfMines = 20;
    private slots: Slot[] = [];
    gameOverEmitter: EventEmitter = new EventEmitter();
    
    initBoard() {
        for (let i = 0; i < this.boardSize; i++) {            
            this.slots.push(new Slot(i, false, 0));
        }
        for (let j = 0; j < this.amountOfMines; j++) {
            this.placeRandomMine(this.slots);
        }
        this.countMinesNear(this.slots);
        return this.slots;
    }
    
    checkForVictory() {
        let noUnFlaggedMines = this.getMines().filter(function(slot) {
            return !slot.flag;
        }).length < 1;
        let noFlaggedMinelessSlots = this.slots.filter(function(slot) {
            return !slot.mine && slot.flag;    
        }).length < 1;
        if (noUnFlaggedMines && noFlaggedMinelessSlots) {
            this.gameOverEmitter.next('Victory!');
            this.gameOver();
        }
    }
    
    gameOver() {
        this.gameOverEmitter.next('Game Over!');
        this.slots.forEach(function(slot) {
            slot.clicked = true;
        });
    }
    
    turnEmptySlots(slotId: number) {
        this.turnNeighbors([slotId], slotId);
    }
    
    private turnNeighbors(idsTurned: number[], currentId: number) {
        let slotsToTurn : Slot[] = this.getNeightborsForSlot(currentId, this.slots)
            .filter((slot) => return !slot.mine);
        let that = this;
        slotsToTurn.forEach(function(slot) {
            if (slot.minesNear === 0 && !slot.clicked && idsTurned.indexOf(slot.id) < 0) {
                slot.clicked = true;
                idsTurned.push(slot.id);
                that.turnNeighbors(idsTurned, slot.id);
            } else {
                slot.clicked = true;
                idsTurned.push(slot.id);
            }            
        });
    }
    
    private getMines() {
        return this.slots.filter((slot) => return slot.mine);
    }
    
    private placeRandomMine(slots: Slot[]) {
        let idOfMine = Math.floor(Math.random() * slots.length);
        if (!slots[idOfMine].mine) {
            slots[idOfMine].mine = true;
        } else {
            this.placeRandomMine(slots);
        }
    }
    
    private countMinesNear(slots: Slot[]) {
        for (let i = 0; i < slots.length; i++) {            
            slots[i].minesNear = this.getNeightborsForSlot(i, slots)
                .filter((slot) => return slot.mine)
                .length;
        }
    }
    
    private isInsideBoard(index : number) {
        return index >= 0 && index < this.boardSize;    
    }
    
    private getNeightborsForSlot(slotId: number, slots: Slot[]) {
        let neighbors: Slot[] = [];
        let slotOnLeftSide = this.slotIsOnLeftSide(slotId);
        let slotOnRightSide = this.slotIsOnRightSide(slotId);
        let aboveSlot = slotId - 10;
        let belowSlot = slotId + 10;
        if (!slotOnLeftSide && this.isInsideBoard(slotId - 1)) neighbors.push(slots[slotId - 1]);
        if (!slotOnRightSide && this.isInsideBoard(slotId + 1)) neighbors.push(slots[slotId + 1]);
        if (this.isInsideBoard(aboveSlot)) neighbors.push(slots[aboveSlot]);
        if (this.isInsideBoard(belowSlot)) neighbors.push(slots[belowSlot]);
        if (!slotOnLeftSide && this.isInsideBoard(aboveSlot - 1)) neighbors.push(slots[aboveSlot - 1]);
        if (!slotOnRightSide && this.isInsideBoard(aboveSlot + 1)) neighbors.push(slots[aboveSlot + 1]);
        if (!slotOnLeftSide && this.isInsideBoard(belowSlot - 1)) neighbors.push(slots[belowSlot - 1]);
        if (!slotOnRightSide && this.isInsideBoard(belowSlot + 1)) neighbors.push(slots[belowSlot + 1]);
        return neighbors;
    }
    
    private slotIsOnRightSide(id : number) {
        return [9, 19, 29, 39, 49, 59, 69, 79, 89, 99].indexOf(id) >= 0;
    }
    
    private slotIsOnLeftSide(id: number) {
        return id % 10 === 0;
    }

}