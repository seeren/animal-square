import { Component } from "babel-skeleton";

import { template } from "./score.component.html";
import { SquareService } from "../../shared/services/square.service";
    
export class ScoreComponent extends Component {

    constructor() {
        super({
            selector: "score",
            template: template
        });
    }

    onInit () {
        this.square = SquareService.get();
    }

}
