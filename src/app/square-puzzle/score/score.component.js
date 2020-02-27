import { Component } from "babel-skeleton";

import { template } from "./score.component.html";
import { ScoreService } from "../../shared/services/score.service";

export class ScoreComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "score",
            template: template
        });
        this.listener = (service) => this[service.state] ? this[service.state]() : null;
    }

    /**
     * @fires
     */
    onInit() {
        this.timeout = 0;
        ScoreService.attach(this.listener);
    }

    /**
     * @fires
     */
    onDestroy() {
        this.pause();
        ScoreService.detach(this.listener);
    }

    /**
     * @event
     */
    play() {
        const score = window.document.querySelector(`${this.selector} .time`);
        this.timeout = window.setTimeout(() => {
            ScoreService.time--;
            score.innerHTML = ScoreService.time;
            ScoreService.time ? this.play() : ScoreService.stop();
        }, 1000);
    }

    /**
     * @event
     */
    pause() {
        this.timeout = window.clearTimeout(this.timeout);
    }

}
