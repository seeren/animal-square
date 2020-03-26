import { Service } from 'babel-skeleton';

export const ScoreService = new class extends Service {

    /**
     * @constructor
     */
    constructor() {
        super();
        this.time = 0;
        this.state = null;
    }

    /**
     * @emits
     */
    start() {
        this.state = "start";
    }

    /**
     * @emits
     */
    stop() {
        this.state = "stop";
        this.notify();
    }

    /**
     * @param {Square} square
     * @returns {Number}
     */
    medail(time) {
        return time
            ? time > 175 ? "gold" : (time > 50 ? "silver" : "bronze")
            : "black";
    }

}
