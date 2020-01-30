import { Component, RouterComponent } from "babel-skeleton";

import { template } from "./square.component.html";
import { Square } from "../../shared/models/square.model";
import { NoticeComponent } from "../../shared/components/notice/notice.component";

export class SquareComponent extends Component {

    /**
     * @constructor
     * @param {Square} square 
     */
    constructor(square) {
        super({
            selector: "square",
            template: template,
            components: [new NoticeComponent]
        });
        this.square = square;
    }

    /**
     * @fires
     */
    onInit() {
        this.timeout = 0;
        this.components[0].title = "Play";
        this.components[0].background = `animals/${
            this.square.animal.name
            }/${this.square.animal.name}-${this.square.score.hit ? `color` : `black`}.png`;
    }

    /**
     * @fires
     * @param {Component} component 
     * @param {Boolean} replace 
     */
    attach(component, replace) {
        super.attach(component, replace);
        const instance = component.getInstance() - 1;
        this.template = this.template.replace(`square="0"`, `square="${instance}"`);
        component.selector = `notice[data-square="${instance}"]`;
    }

    /**
     * @event
     */
    play() {
        if (!this.timeout) {
            this.timeout = window.setTimeout(
                () => RouterComponent.navigate("square-puzzle", { id: this.square.level.number }),
                this.components[0].hide()
            );
        }
    }

}
