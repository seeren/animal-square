import { Component } from "babel-skeleton";

import { template } from "./square.component.html";

export class SquareComponent extends Component {

    constructor(square) {
        super({
            selector: "square",
            template: template
        });
        this.square = square;
    }

}
