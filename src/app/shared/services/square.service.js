import { Service } from 'babel-skeleton';
import { Square } from '../models/square.model';

export const SquareService = new class extends Service {

    /**
     * @constructor
     */
    constructor() {
        super();
        this.square = null
    }

    /**
     * @returns {Square}
     */
    get() {
        return this.square;
    }

    /**
     * @param {Square} square
     * @returns {SquareService} 
     */
    set(square) {
        this.square = square;
        return this.notify();
    }

}
