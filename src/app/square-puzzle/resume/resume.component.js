import { Component, RouterComponent } from "babel-skeleton";

import { template } from "./resume.component.html";
import { ResumeService } from "../../shared/services/resume.service";
import { SquareService } from "../../shared/services/square.service";

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
        return this.resume = ResumeService.toogle();
    }

    /**
     * @event
     */
    exit() {
        RouterComponent.navigate("square-list");
    }

}
