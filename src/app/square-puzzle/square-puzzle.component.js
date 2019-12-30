import { Component, RouterComponent } from "babel-skeleton";
import { template } from "./square-puzzle.component.html";
import { SquareService } from "../shared/services/square.service";
    
export class SquarePuzzleComponent extends Component {

    constructor() {
        super({
            selector: "puzzle",
            template: template
        });
    }

    onInit () {
        this.square = SquareService.get();
        if (this.square.level.number !== RouterComponent.get(`id`)) {
            return RouterComponent.navigate("square-list");
        }
    }

}
