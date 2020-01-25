import { Service } from 'babel-skeleton';
import { Direction } from '../models/direction.model';

export const DirectionService = new class extends Service {

    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * @param {TouchEvent} event 
     * @returns {Direction}
     */
    get(event) {
        
        const direction = new Direction;
        if (event.target.parentNode === window.document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY - event.target.clientHeight)) {
            direction.property = "top";
            direction.axe = "Y";
            direction.positive = false;
        } else if (event.target.parentNode === window.document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY + event.target.clientHeight)) {
            direction.property = "top";
            direction.axe = "Y";
            direction.positive = true;
        } else if (event.target.parentNode === window.document.elementFromPoint(event.touches[0].clientX + event.target.clientWidth, event.touches[0].clientY)) {
            direction.property = "left";
            direction.axe = "X";
            direction.positive = true;
        } else if (event.target.parentNode === window.document.elementFromPoint(event.touches[0].clientX - event.target.clientWidth, event.touches[0].clientY)) {
            direction.property = "left";
            direction.axe = "X";
            direction.positive = false;
        }
        return direction;
    }

}
