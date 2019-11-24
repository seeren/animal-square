import { Component } from "babel-skeleton";
import { template } from "./square-list.component.html";
import { SquareComponent } from "./square/square.component";
import { SquareListService } from "../../../shared/services/square-list.service";
import { SquareService } from "../../../shared/services/square.service";
import { SquareNavigationComponent } from "./square-navigation/square-navigation.component";

export class SquareListComponent extends Component {

    constructor() {
        super({
            selector: "square-list",
            template: template
                .replace("${length}", SquareListService.get().length)
                .replace("${squares}", SquareListService.get().map(() => `<square></square>`).join("")),
            components: SquareListService.get()
                .map((square) => new SquareComponent(square))
                .concat([new SquareNavigationComponent])
        });
        SquareService.attach((service) => this.onSquare(service.get()));
        this.square = SquareService.get();
    }

    onSquare(square) {
        const carrousel = window.document.querySelector(`${this.selector} .caroussel`)
        carrousel.className = carrousel.className.replace(
            `target-${this.square.level.number}`,
            `target-${square.level.number}`
        );
        this.square = square;
    }

}
