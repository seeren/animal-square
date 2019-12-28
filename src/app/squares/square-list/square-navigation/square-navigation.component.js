import { Component } from "babel-skeleton";

import { template } from "./square-navigation.component.html";
import { SquareService } from "../../shared/services/square.service";
import { SquareListService } from "../../shared/services/square-list.service";

export class SquareNavigationComponent extends Component {

    constructor() {
        super({
            selector: "square-navigation",
            template: template
        });
        SquareService.attach(service => this.onSquare(service.get()));
    }

    onInit() {
        this.id = this.id || 0;
        this.square = SquareService.get();
        this.next = SquareListService.isNext(this.square);
        this.previous = SquareListService.isPrevious(this.square);
    }

    onUpdate(element) {
        this.id = window.clearTimeout(this.id);
        const links = element.getElementsByTagName("a");
        const linksOnClick = [];
        for (const link of links) {
            linksOnClick.push(link.onclick);
            link.onclick = null;
        }
        this.id = window.setTimeout(() => linksOnClick.forEach(
            (onClick, key) => links[key].onclick = onClick
        ), 500);
    }

    onSquare(square) {
        if (this.square !== square) {
            this.onInit();
            this.update();
        }
    }

    slide(offset) {
        SquareService.set(SquareListService.get().find(square =>
            square.level.number === this.square.level.number + offset
        ));
    }

}
