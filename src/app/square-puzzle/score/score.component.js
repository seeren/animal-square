import { Component, RouterComponent } from "babel-skeleton";

import { template } from "./score.component.html";
import { SquareListService } from "../../shared/services/square-list.service";

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
        this.square = SquareListService.getById(1, RouterComponent.get("id"));
    }

}
