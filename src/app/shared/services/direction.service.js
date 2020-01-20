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
     * @param {MouseEvent} event 
     * @returns {Direction}
     */
    get(event) {
        const direction = new Direction;
        if (event.target.parentNode === window.document.elementFromPoint(event.clientX, event.clientY - event.target.clientHeight)) {
            direction.property = "top";
            direction.distance = -event.target.clientHeight;
        } else if (event.target.parentNode === window.document.elementFromPoint(event.clientX + event.target.clientWidth, event.clientY)) {
            direction.property = "left";
            direction.distance = event.target.clientWidth;
        } else if (event.target.parentNode === window.document.elementFromPoint(event.clientX, event.clientY + event.target.clientHeight)) {
            direction.property = "top";
            direction.distance = event.target.clientHeight;
        } else if (event.target.parentNode === window.document.elementFromPoint(event.clientX - event.target.clientWidth, event.clientY)) {
            direction.property = "left";
            direction.distance = -event.target.clientWidth;
        }
        return direction;
    }


}
