import { Service } from 'babel-skeleton';
import { Direction } from '../models/direction.model';

export const DirectionService = new class extends Service {

    /**
     * @constructor
     */
    constructor() {
        super();
        this.direction = new Direction;
    }

    /**
     * @param {TouchEvent} event 
     * @returns {Direction}
     */
    get(event) {
        if (event.target.parentNode === window.document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY - event.target.clientHeight)) {
            this.direction.property = "top";
            this.direction.axe = "Y";
            this.direction.positive = false;
        } else if (event.target.parentNode === window.document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY + event.target.clientHeight)) {
            this.direction.property = "top";
            this.direction.axe = "Y";
            this.direction.positive = true;
        } else if (event.target.parentNode === window.document.elementFromPoint(event.touches[0].clientX + event.target.clientWidth, event.touches[0].clientY)) {
            this.direction.property = "left";
            this.direction.axe = "X";
            this.direction.positive = true;
        } else if (event.target.parentNode === window.document.elementFromPoint(event.touches[0].clientX - event.target.clientWidth, event.touches[0].clientY)) {
            this.direction.property = "left";
            this.direction.axe = "X";
            this.direction.positive = false;
        } else {
            this.direction.property = this.direction.axe = this.direction.positive = null;
        }
        return this.direction;
    }

}
