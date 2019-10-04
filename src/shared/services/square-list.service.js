import { Service } from 'babel-skeleton';
import { default as game } from './../../../config/game.json';
import { SquareList } from '../models/square-list.model';
import { Square } from '../models/square.model';

export const SquareListService = new class extends Service {

    constructor() {
        super();
        this.squareList = new SquareList;
        game.animals.forEach((value, index) => {
            let square = new Square;
            square.animal.name = value;
            square.level.difficulty = 1;
            square.level.number = ++index;
            square.score.hit = 0;
            this.squareList.push(square);
        });
    }

    get() {
        return this.squareList;
    }

}
