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
     * @returns {Number}
     */
    medail(time) {
        return !time ? "black" : (
            time > 250 ? "gold" : (
                time > 150 ? "silver" : "bronze"
            )
        );
    }

}
