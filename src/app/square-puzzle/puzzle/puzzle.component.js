import { Component } from "babel-skeleton";
import { template } from "./puzzle.component.html";
import { SquareService } from "../../shared/services/square.service";

export class PuzzleComponent extends Component {

    constructor() {
        super({
            selector: "puzzle",
            template: template
        });
    }

    onInit() {
        this.square = SquareService.get();
    }

}
