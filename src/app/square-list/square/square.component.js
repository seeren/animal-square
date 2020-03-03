import { Component, RouterComponent } from "babel-skeleton";

import { template } from "./square.component.html";
import { Square } from "../../shared/models/square.model";
import { NoticeComponent } from "../../shared/components/notice/notice.component";
import { ScoreService } from "../../shared/services/score.service";
import { WhipSoundService } from "../../shared/services/sounds/whip-sound.service";

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
        this.notice = this.components[0];
    }

    /**
     * @fires
     */
    onInit() {
        this.timeout = 0;
        this.medail = ScoreService.medail(this.square.score.time);
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
     * @fires
     */
    onUpdate() {
        this.notice.background = `animals/${
            this.square.animal.name}/${
            this.square.animal.name}-${
            this.square.score.time ? `color` : `black`}.png`;
        this.notice.show("Visit");
    }

    /**
     * @event
     */
    visit() {
        if (!this.timeout) {
            WhipSoundService.play();
            this.timeout = window.setTimeout(() => RouterComponent.navigate(
                "square-puzzle",
                { id: this.square.level.number }
            ), this.notice.hide());
        }
    }

}
