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
     * @returns {Direction[]}
     */
    getAll(event) {
        const top = new Direction;
        const bottom = new Direction;
        const right = new Direction;
        const left = new Direction;
        top.x = event.touches[0].clientX;
        top.y = event.touches[0].clientY - event.target.clientHeight;
        top.property = "top";
        top.axe = "Y";
        top.positive = false;
        bottom.x = event.touches[0].clientX;
        bottom.y = event.touches[0].clientY + event.target.clientHeight;
        bottom.property = "top";
        bottom.axe = "Y";
        bottom.positive = true;
        right.x = event.touches[0].clientX + event.target.clientWidth;
        right.y = event.touches[0].clientY;
        right.property = "left";
        right.axe = "X";
        right.positive = true;
        left.x = event.touches[0].clientX - event.target.clientWidth;
        left.y = event.touches[0].clientY;
        left.property = "left";
        left.axe = "X";
        left.positive = false;
        return [top, bottom, right, left];
    }

    /**
     * @param {TouchEvent} event 
     * @returns {Direction}
     */
    get(event) {
        for (const direction of this.getAll(event)) {
            const elements = document.elementsFromPoint(direction.x, direction.y);
            const index = elements.indexOf(event.target.parentNode);
            if (-1 !== index) {
                const element = elements[index - 1];
                if (!element || element.tagName !== event.target.tagName) {
                    return direction;
                }
            }
        }
        return new Direction;
    }

}
