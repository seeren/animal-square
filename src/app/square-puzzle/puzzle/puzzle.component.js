import { Component } from "babel-skeleton";
import { template } from "./puzzle.component.html";
import { SquareService } from "../../shared/services/square.service";
import { DirectionService } from "../../shared/services/direction.service";
import { Direction } from "../../shared/models/direction.model";

export class PuzzleComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "puzzle",
            template: template
        });
    }

    /**
     * @fires
     */
    onInit() {
        this.id = 0;
        this.square = SquareService.get();
    }

    /**
     * @fires
     */
    onUpdate() {
        for (const cel of window.document.querySelectorAll(`${this.selector} .cel`)) this.addTouchStart(cel);
    }

    /**
     * @param {HTMLElement} cel 
     */
    addTouchStart(cel) {
        cel.ontouchstart = e => this.onTouchStart(cel, { X: e.touches[0].clientX, Y: e.touches[0].clientY });
    }

    /**
     * @event
     * @param {HTMLElement} cel 
     * @param {Object} client
     */
    onTouchStart(cel, client) {
        const direction = DirectionService.get(event);
        if (direction.property && !this.id) {
            const position = parseFloat(window.getComputedStyle(cel).getPropertyValue(direction.property), 10);
            const minimum = direction.positive ? position : position - cel.clientHeight;
            const maximum = direction.positive ? position + cel.clientHeight : position;
            cel.style.transition = "unset";
            cel.style[direction.property] = `${position}px`;
            cel.ontouchstart = null;
            cel.ontouchend = () => this.onTouchEnd(cel, direction, position, minimum, maximum);
            cel.ontouchmove = e => {
                this.onTouchMove(cel, direction, minimum, maximum);
                direction.distance = e.touches[0][`client${direction.axe}`] - client[direction.axe];
                client[direction.axe] = e.touches[0][`client${direction.axe}`]
            };
        }
    }

    /**
     * @event
     * @param {HTMLElement} cel 
     * @param {Direction} direction
     * @param {Number} minimum
     * @param {Number} maximum
     */
    onTouchMove(cel, direction, minimum, maximum) {
        const target = parseFloat(cel.style[direction.property], 10) + direction.distance;
        cel.style[direction.property] = `${
            target > minimum ? (target > maximum ? maximum : target) : minimum
            }px`;
    }

    /**
     * @event
     * @param {HTMLElement} cel 
     * @param {Direction} direction
     * @param {Number} initial
     * @param {Number} minimum
     * @param {Number} maximum
     */
    onTouchEnd(cel, direction, initial, minimum, maximum) {
        this.id = window.setTimeout(() => this.addTouchStart(cel, this.id = window.clearTimeout()), 300);
        const position = parseFloat(cel.style[direction.property], 10);
        cel.ontouchmove = cel.ontouchend = cel.style.transition = null;
        cel.style[direction.property] = `${(
            minimum === initial && minimum === position ? maximum : (
                maximum === initial && maximum === position || position - minimum < maximum - position
                    ? minimum : maximum
            )) / cel.parentNode.clientHeight * 100}%`;
    }

}
