import { Service } from 'babel-skeleton';
import { ScoreService } from './score.service';
import { ResumeService } from './resume.service';

export const MonkeyService = new class extends Service {

    /**
     * @constructor
     */
    constructor() {
        super();
        this.state = null;
        this.number = null;
    }

    /**
     * @returns {Boolean}
     */
    isPlayable() {
        return !ResumeService.resume && "stop" !== ScoreService.state;
    }

    /**
     * @emits
     */
    hit() {
        this.notify(this.state = "hit");
    }

    /**
     * @emits
     */
    stop() {
        this.notify(this.state = "stop");
    }

    /**
     * @param {Number} number
     */
    start(number) {
        this.number = number;
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
     * @returns {Number} 
     */
    random() {
        let number = this.number;
        while (number === this.number) {
            number = Math.floor(Math.random() * Math.floor(14)) + 1;
        }
        return number;
    }

    /**
     * @returns {HTMLElement} 
     */
    cel() {
        const shape = window.document.querySelector(`monkey`).getBoundingClientRect();
        return window.document.elementsFromPoint(
            shape.x + 5,
            shape.y + 5
        ).find(element => -1 !== element.className.indexOf("cel cel-"));
    }

}
