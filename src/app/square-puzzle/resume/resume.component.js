import { Component, RouterComponent } from "babel-skeleton";

import { template } from "./resume.component.html";
import { ResumeService } from "../shared/resume.service";
import { SquareService } from "../../shared/services/square.service";
import { ScoreService } from "../../shared/services/score.service";
import { BirdSoundService } from "../../shared/services/sounds/bird-sound.service";

export class ResumeComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "resume",
            template: template
        });
    }

    /**
     * @fires
     */
    onInit() {
        this.square = SquareService.get();
        this.resume = ResumeService.get();
    }

    /**
     * @fires
     */
    onDestroy() {
        if (this.resume) {
            this.toogle();
        }
    }

    /**
     * @event
     */
    toogle() {
        if ("play" === ScoreService.state || this.resume) {
            if (!this.resume) {
                BirdSoundService.signal();
            }
            return this.resume = ResumeService.toogle();
        }
    }

    /**
     * @event
     */
    exit() {
        RouterComponent.navigate("square-list");
    }

}
