import { Component } from "babel-skeleton";

import { template } from "./score.component.html";
import { ScoreService } from "../../shared/services/score.service";
import { ResumeService } from "../shared/resume.service";

export class ScoreComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "score",
            template: template
        });
        this.listener = (service) => service.resume ? this.onPause() : this.onResume();
    }

    /**
     * @fires
     */
    onInit() {
        this.interval = 0;
        ScoreService.time = 200;
        ResumeService.attach(this.listener);
    }

    /**
     * @fires
     */
    onDestroy() {
        this.onPause();
        ScoreService.stop();
        ResumeService.detach(this.listener);
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
