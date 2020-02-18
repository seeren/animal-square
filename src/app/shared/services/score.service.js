import { Service } from 'babel-skeleton';

export const ScoreService = new class extends Service {

    /**
     * @constructor
     */
    constructor() {
        super();
        this.state = null;
        this.time = 0;
    }

    /**
     * @emits
     */
    stop() {
        this.notify(this.state = "stop");
    }

    /**
     * @emits
     */
    start() {
        this.time = 320;
        this.notify(this.state = "start");
    }

    /**
     * @emits
     */
    play() {
        this.notify(this.state = "play");
    }

    /**
     * @emits
     */
    pause() {
        this.notify(this.state = "pause");
    }

    /**
     * @param {Square} square
     * @returns {String}
     */
    medail(square) {
        return !square.score.time ? "black" : (
            square.score.time > 275 ? "gold" : (
                square.score.time > 150 ? "silver" : "bronze"
            )
        );
    }

}
