import { Component, RouterComponent } from "babel-skeleton";

import { template } from "./square.component.html";
import { Square } from "../../shared/models/square.model";

export class SquareComponent extends Component {

    /**
     * @constructor
     * @param {Square} square 
     */
    constructor(square) {
        super({
            selector: "square",
            template: template
        });
        this.square = square;
    }

    /**
     * @event
     */
    play() {
        RouterComponent.navigate("square-puzzle", { id: this.square.level.number });
    }

}
