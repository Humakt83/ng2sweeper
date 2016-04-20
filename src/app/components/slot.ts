export class Slot {
    
    public flag: boolean = false;
    
    constructor(public mine: boolean, public minesNear: number) {};
    
    toggleFlag() {
        this.flag = !this.flag;
    }
}
