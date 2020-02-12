import { Component, RouterComponent } from "babel-skeleton";

import { template } from "./puzzle.component.html";
import { DirectionService } from "../../shared/services/direction.service";
import { Direction } from "../../shared/models/direction.model";
import { SquareListService } from "../../shared/services/square-list.service";
import { MonkeyComponent } from "./monkey/monkey.component";

export class PuzzleComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "puzzle",
            template: template,
            components: [new MonkeyComponent]
        });
    }

    /**
     * @fires
     */
    onInit() {
        this.id = false;
        this.square = SquareListService.getById(1, RouterComponent.get("id"));
    }

    /**
     * @fires
     * @param {HTMLElement} puzzle
     */
    onUpdate() {
        for (const cel of window.document.querySelectorAll(`${this.selector} .cel`)) {
            this.registerTouchStart(cel);
        };
    }

    /**
     * @param {HTMLElement} cel 
     */
    registerTouchStart(cel) {
        cel.ontouchstart = e => this.onTouchStart({
            target: cel,
            touches: [{ clientX: e.touches[e.touches.length - 1].clientX, clientY: e.touches[e.touches.length - 1].clientY }],
            X: e.touches[0].clientX,
            Y: e.touches[0].clientY
        });
    }

    /**
     * @event
     * @param {TouchEvent} event
     */
    onTouchStart(event) {
        const direction = DirectionService.get(event);
        if (!this.id && direction.property) {
            this.id = true;
            const cel = event.target;
            const position = parseFloat(window.getComputedStyle(cel).getPropertyValue(direction.property), 10);
            const minimum = direction.positive ? position : position - cel.clientHeight;
            const maximum = direction.positive ? position + cel.clientHeight : position;
            cel.className += ` fire ${direction.property}-${direction.positive}`;
            cel.style.transition = "unset";
            cel.style[direction.property] = `${position}px`;
            cel.ontouchend = () => this.onTouchEnd(cel, direction, minimum, maximum, position);
            cel.ontouchmove = e => {
                this.onTouchMove(cel, direction, minimum, maximum);
                direction.distance = e.touches[0][`client${direction.axe}`] - event[direction.axe];
                event[direction.axe] = e.touches[0][`client${direction.axe}`]
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
        cel.style[direction.property] = `${target > minimum
            ? (target > maximum ? maximum : target)
            : minimum}px`;
    }

    /**
     * @event
     * @param {HTMLElement} cel 
     * @param {Direction} direction
     * @param {Number} minimum
     * @param {Number} maximum
     * @param {Number} initial
     */
    onTouchEnd(cel, direction, minimum, maximum, initial) {
        this.id = window.clearTimeout(this.id);
        this.id = window.setTimeout(() => {
            cel.className = cel.className.replace(` fire ${direction.property}-${direction.positive}`, "");
            this.id = false;
        }, 300);
        const position = parseFloat(cel.style[direction.property], 10);
        cel.ontouchmove = cel.ontouchend = cel.style.transition = null;
        cel.style[direction.property] = `${(
            minimum === initial && minimum === position ? maximum : (
                maximum === initial && maximum === position || position - minimum < maximum - position
                    ? minimum : maximum
            )) / cel.parentNode.clientHeight * 100}%`;
    }

}
