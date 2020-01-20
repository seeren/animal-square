import { Service } from 'babel-skeleton';

import { default as game } from './../../../../config/game.json';
import { SquareList } from '../models/square-list.model';
import { Square } from '../models/square.model';
import { SquareService } from './square.service.js';

export const SquareListService = new class extends Service {

    /**
     * @constructor
     */
    constructor() {
        super();
        this.squareList = new SquareList;
        game.animals.forEach((value, index) => {
            const square = new Square;
            this.squareList.push(square);
            square.animal.name = value;
            square.level.difficulty = 1;
            square.level.number = ++index;
            square.score.hit = 0;
            if (square.level.number < 3) {
                square.score.hit = 1;
            }
        });
        SquareService.set(this.squareList[0]);
    }

    /**
     * @param {Square} square 
     * @returns {Boolean}
     */
    isPrevious(square) {
        return 1 !== square.level.number;
    }
    /**
     * @param {Square} square 
     * @returns {Boolean}
     */
    isNext(square) {
        return this.squareList.length !== square.level.number && square.score.hit;
    }
    
    /**
     * @returns {Square[]}
     */
    get() {
        return this.squareList;
    }

}
