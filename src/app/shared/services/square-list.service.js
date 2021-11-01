import { Service } from 'babel-skeleton';

import { default as game } from './../../../../config/game.json';

import { SquareList } from '../models/square-list.model';
import { Square } from '../models/square.model';
import { SquareService } from './square.service.js';

export const SquareListService = new class extends Service {

    constructor() {
        super();
        // this.squareList = this.fetch();
        if (!this.squareList) {
            this.squareList = this.init();
            this.save();
        }
        SquareService.set(this.squareList[6]);
    }

    init() {
        const squareList = new SquareList;
        game.animals.forEach((value, index) => {
            const square = new Square;
            squareList.push(square);
            square.animal.name = value;
            square.level.number = ++index;
            square.score.time = 180;
            if (index < 7) {
                square.score.time = 180;
            }
        });
        return squareList;
    }

    fetch() {
        return JSON.parse(window.localStorage.getItem('animal-square'))
    }

    save() {
        window.localStorage.setItem('animal-square', JSON.stringify(this.squareList));
    }
    
    get() {
        return this.squareList;
    }
    
    find(id) {
        return this.squareList.find((square) => id === square.level.number);
    }
    
    hasPrevious(square) {
        return 1 !== square.level.number;
    }

    hasNext(square) {
        return (this.squareList.length !== square.level.number) && square.score.time;
    }

}
