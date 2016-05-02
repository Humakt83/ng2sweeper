export class Slot {
    
    flag: boolean = false;
    clicked: boolean = false;
    
    
    constructor(public id: number, public mine: boolean, public minesNear: number) {};
    
    toggleFlag() {
        this.flag = !this.flag;
    }
}
