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
        this.squareList = this.select();
        if (!this.squareList) {
            this.squareList = this.init();
            this.save();
        }
        SquareService.set(this.squareList[0]);
    }

    /**
     * @returns {Square[]}
     */
    init() {
        const squareList = new SquareList;
        game.animals.forEach((value, index) => {
            const square = new Square;
            squareList.push(square);
            square.animal.name = value;
            square.level.number = ++index;
            square.score.time = 0
        });
        return squareList;
    }

    /**
     * @returns {Square[]|void}
     */
    select() {
        return JSON.parse(window.localStorage.getItem("animal-square"))
    }

    /**
     * @returns {void}
     */
    save() {
        window.localStorage.setItem("animal-square", JSON.stringify(this.squareList));
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
        return this.squareList.length !== square.level.number && square.score.time;
    }

    /**
     * @returns {Square[]}
     */
    get() {
        return this.squareList;
    }

    /**
     * @param {Number} id 
     * @returns {Square}
     */
    set(id) {
        const square = this.squareList.find(square => id === square.level.number);
        SquareService.set(square)
        return square;
    }

}
