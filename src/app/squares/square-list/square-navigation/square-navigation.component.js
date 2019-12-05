import { Component } from "babel-skeleton";
import { template } from "./square-navigation.component.html";
import { SquareService } from "../../../shared/services/square.service";
import { SquareListService } from "../../../shared/services/square-list.service";

export class SquareNavigationComponent extends Component {

    constructor() {
        super({
            selector: "square-navigation",
            template: template
        });
        this.square = SquareService.get();
        this.squaresLength = SquareListService.get().length;
    }

    slide(offset) {
        return SquareService.set(this.square = SquareListService.get().find(
            square => square.level.number === this.square.level.number + offset
        ));
    }

}
