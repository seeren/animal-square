import { Component } from "babel-skeleton";

import { template } from "./puzzle.component.html";
import { DirectionService } from "../../shared/services/direction.service";
import { Direction } from "../../shared/models/direction.model";
import { MonkeyComponent } from "./monkey/monkey.component";
import { ScoreService } from "../../shared/services/score.service";
import { PuzzleService } from "../../shared/services/puzzle.service";
import { SquareService } from "../../shared/services/square.service";

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
        this.timeout = false;
        this.square = SquareService.get();
    }

    /**
     * @fires
     */
    onDestroy() {
        this.timeout = window.clearTimeout(this.timeout);
    }

    /**
     * @fires
     * @param {HTMLElement} puzzle
     */
    onUpdate() {
        for (const cel of window.document.querySelectorAll(`${this.selector} .cel`)) {
            cel.ontouchstart = (e) => this.onTouchStart(DirectionService.getEvent(e));
        };
    }

    /**
     * @event
     * @param {TouchEvent} event
     */
    onTouchStart(event) {
        const direction = DirectionService.get(event);
        if (!this.timeout && direction.property) {
            this.timeout = true;
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
                direction.distance = e.touches[0][`client${direction.axe.toUpperCase()}`] - event[direction.axe];
                event[direction.axe] = e.touches[0][`client${direction.axe.toUpperCase()}`];
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
        const target = window.parseFloat(cel.style[direction.property], 10) + direction.distance;
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
        this.timeout = window.clearTimeout(this.timeout);
        this.timeout = window.setTimeout(() => {
            cel.className = cel.className.replace(` fire ${direction.property}-${direction.positive}`, "");
            PuzzleService.complete() ? ScoreService.stop() : this.timeout = false;
        }, 300);
        const position = window.parseFloat(cel.style[direction.property], 10);
        cel.ontouchmove = cel.ontouchend = cel.style.transition = null;
        cel.style[direction.property] = `${(
            minimum === initial && minimum === position ? maximum : (
                maximum === initial && maximum === position || position - minimum < maximum - position
                    ? minimum : maximum
            )
        ) / cel.parentNode.clientHeight * 100}%`;
    }

}
