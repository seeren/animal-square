import { Component, RouterComponent } from "babel-skeleton";

import { template } from "./square-navigation.component.html";
import { SquareService } from "../../shared/services/square.service";
import { SquareListService } from "../../shared/services/square-list.service";
import { Square } from "../../shared/models/square.model";
import { PageSoundService } from "../../shared/services/sounds/page-sound.service";

export class SquareNavigationComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "square-navigation",
            template: template
        });
        this.listner = service => this.onSquare(service.get());
    }

    /**
     * @fires
     */
    onInit() {
        this.id = this.id || 0;
        this.square = SquareService.get();
        this.next = SquareListService.isNext(this.square);
        this.previous = SquareListService.isPrevious(this.square);
        this.length = SquareListService.get().length;
        SquareService.attach(this.listner);
    }

    /**
     * @fires
     */
    onDestroy() {
        SquareService.detach(this.listner);
    }

    /**
     * @fires
     */
    onUpdate() {
        this.id = window.clearTimeout(this.id);
        const links = window.document.querySelectorAll(`${this.selector} a`);
        const linksOnClick = [];
        for (const link of links) {
            linksOnClick.push(link.onclick);
            link.onclick = null;
        }
        this.id = window.setTimeout(() => linksOnClick.forEach(
            (onClick, key) => links[key].onclick = onClick
        ), 500);
    }

    /**
     * @event
     * @param {Square} square 
     */
    onSquare(square) {
        if (this.square !== square) {
            this.onInit();
            this.update();
        }
    }

    /**
     * @event
     * @param {Number} offset 
     */
    slide(offset) {
        PageSoundService.play();
        SquareService.set(SquareListService.get().find(square =>
            square.level.number === this.square.level.number + offset
        ));
    }

    /**
     * @event
     */
    ranking() {
        RouterComponent.navigate("ranking");
    }

}
