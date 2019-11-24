import { Service } from 'babel-skeleton';
import { default as game } from './../../../config/game.json';
import { SquareList } from '../models/square-list.model';
import { Square } from '../models/square.model';
import { SquareService } from './square.service.js';

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
        SquareService.set(this.squareList[0]);
    }

    get() {
        return this.squareList;
    }

}
