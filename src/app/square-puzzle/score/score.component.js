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
    }

    /**
     * @fires
     */
    onInit() {
        this.interval = 0;
        ScoreService.time = 200;
    }

    /**
     * @fires
     */
    onDestroy() {
        this.onPause();
        ScoreService.stop();
    }

    /**
     * @fires
     */
    onUpdate() {
        const score = window.document.querySelector(`${this.selector} .time`);
        this.interval = window.setInterval(() => {
            ScoreService.time--;
            score.innerHTML = ScoreService.time;
            if (0 === ScoreService.time) {
                this.onDestroy();
            }
        }, 1000);
    }

    /**
     * @fires
     */
    onPause() {
        window.clearInterval(this.interval);
    }

    /**
     * @fires
     */
    onResume() {
        this.onUpdate();
    }

}
