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
            components: [
                new NoticeComponent
            ]
        });
        this.square = square;
        this.notice = this.components[0];
    }

    /**
     * @fires
     */
    onInit() {
        this.timeout = null;
        this.medail = ScoreService.medail(this.square.score.time);
    }

    /**
     * @fires
     */
    onDestroy() {
        this.onPause();
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
     * @fires
     */
    onPause() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }
    }

    /**
     * @fires
     */
    onResume() {
        if (this.timeout) {
            this.navigate(500);
        }
    }

    /**
     * @event
     */
    visit() {
        if (!this.timeout) {
            WhipSoundService.play();
            this.navigate(this.notice.hide());
        }
    }

    /**
     * @event
     * @param {Number}
     */
    navigate(duration) {
        this.timeout = window.setTimeout(() => {
            this.timeout = null;
            RouterComponent.navigate("square-puzzle", {
                id: this.square.level.number
            });
        }, duration);
    }

}
