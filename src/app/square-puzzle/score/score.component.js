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
        this.resumeListener = (service) => service.resume ? this.onPause() : this.onResume();
        this.scoreListener = () => this.onPause();
    }

    /**
     * @fires
     */
    onInit() {
        this.onPause();
        this.interval = null;
        ScoreService.start();
        ScoreService.time = 200;
        ResumeService.attach(this.resumeListener);
        ScoreService.attach(this.scoreListener);
    }

    /**
     * @fires
     */
    onDestroy() {
        this.onPause();
        ScoreService.stop();
        ResumeService.detach(this.resumeListener);
        ScoreService.detach(this.scoreListener);
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
        if (this.interval) {
            window.clearInterval(this.interval);
            this.interval = null;
        }
    }

    /**
     * @fires
     */
    onResume() {
        if (!this.interval) {
            this.onUpdate();
        }
    }

}
