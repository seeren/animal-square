import { Component, RouterComponent } from "babel-skeleton";

import { template } from "./square-puzzle.component.html";
import { SquareService } from "../shared/services/square.service";
import { PuzzleComponent } from "./puzzle/puzzle.component";
import { ScoreComponent } from "./score/score.component";

export class SquarePuzzleComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "square-puzzle",
            template: template,
            components: [
                new ScoreComponent,
                new PuzzleComponent
            ]
        });
    }

    /**
     * @fires
     */
    onInit() {
        this.square = SquareService.get();
        // if (this.square.level.number !== RouterComponent.get(`id`)) {
        //     return RouterComponent.navigate("square-list");
        // }
    }

}
