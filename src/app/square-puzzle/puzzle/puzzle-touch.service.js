import { Service } from 'babel-skeleton';

import { MonkeyService } from './monkey/monkey.service';
import { PuzzleService } from './puzzle.service';
import { PuzzleTouch } from './puzzle-touch.model';

export const PuzzleTouchService = new class extends Service {

    static start = 1;

    static end = 2;

    constructor() {
        super();
        this.state = this.end;
    }

    start(cell) {
        MonkeyService.number = PuzzleService.getCellNumber(cell);
        this.state = this.start;
        this.notify();
    }

    end() {
        this.state = this.end;
        this.notify();
    }

    isStart() {
        return this.start === this.state;
    }

    isEnd() {
        return this.end === this.state;
    }

    getTouchEvent(cell) {
        const shape = cell.getBoundingClientRect();
        return new PuzzleTouch(cell, shape.x + shape.width / 2, shape.y + shape.height / 2)
    }

}
