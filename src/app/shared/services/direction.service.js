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
     * @param {HTMLElement} element 
     * @return {TouchEvent}
     */
    getTouchesEvent(element) {
        const shape = element.getBoundingClientRect();
        const x = shape.x + shape.width / 2;
        const y = shape.y + shape.height / 2;
        return { target: element, touches: [{ clientX: x, clientY: y }], x: x, y: y };
    }

    /**
     * @param {TouchEvent} event 
     * @return {TouchEvent}
     */
    getEvent(event) {
        const touch = event.touches[event.touches.length - 1];
        return { target: event.target, x: touch.clientX, y: touch.clientY };
    }

    /**
     * @param {Number} x 
     * @param {Number} y 
     * @param {String} property 
     * @param {String} axe 
     * @param {Boolean} positive 
     * @returns {Direction}
     */
    createDirection(x, y, property, axe, positive) {
        const direction = new Direction;
        direction.x = x;
        direction.y = y;
        direction.property = property;
        direction.axe = axe;
        direction.positive = positive;
        return direction;
    }

    /**
     * @param {TouchEvent} event 
     * @returns {Direction[]}
     */
    getDirections(event) {
        return [
            this.createDirection(event.x, event.y - event.target.clientHeight, "top", "y", false),
            this.createDirection(event.x, event.y + event.target.clientHeight, "top", "y", true),
            this.createDirection(event.x + event.target.clientWidth, event.y, "left", "x", true),
            this.createDirection(event.x - event.target.clientWidth, event.y, "left", "x", false)
        ];
    }

    /**
     * @param {TouchEvent} event 
     * @returns {Direction}
     */
    get(event) {
        for (const direction of this.getDirections(event)) {
            const elements = document.elementsFromPoint(direction.x, direction.y);
            const parentIndex = elements.indexOf(event.target.parentNode);
            if (-1 !== parentIndex) {
                const element = elements[parentIndex - 1];
                if (!element || element.tagName !== event.target.tagName) {
                    return direction;
                }
            }
        }
        return new Direction;
    }

}
