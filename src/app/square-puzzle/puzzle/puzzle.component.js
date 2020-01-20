import { Component } from "babel-skeleton";
import { template } from "./puzzle.component.html";
import { SquareService } from "../../shared/services/square.service";
import { DirectionService } from "../../shared/services/direction.service";

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
        this.square = SquareService.get();
    }

    /**
     * @fires
     */
    onUpdate() {
        for (const cel of window.document.querySelectorAll(`${this.selector} .cel`)) {
            cel.onclick = (event) => this.onClick(event);
        }
    }

    /**
     * @event
     * @param {MouseEvent} event 
     */
    onClick(event) {
        const direction = DirectionService.get(event);
        if (!direction.property) {
            return;
        }
        const cel = event.target;
        cel.style[direction.property] = `${parseInt(
            window.getComputedStyle(cel).getPropertyValue(direction.property), 10
        ) + direction.distance}px`;
    }

    onTouchStart() {

    }

    onTouchMove() {

    }

    onTouchEnd() {

    }

}
