import { Service } from 'babel-skeleton';

export const SquareService = new class extends Service {

    constructor() {
        super();
        this.square = null
    }

    get() {
        return this.square;
    }

    set(square) {
        this.square = square;
        this.notify();
    }

}
