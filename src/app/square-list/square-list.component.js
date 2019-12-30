import { Component } from "babel-skeleton";

import { template } from "./square-list.component.html";
import { SquareComponent } from "./square/square.component";
import { SquareListService } from "../shared/services/square-list.service";
import { SquareService } from "../shared/services/square.service";
import { SquareNavigationComponent } from "./square-navigation/square-navigation.component";

export class SquareListComponent extends Component {

    constructor() {
        super({
            selector: "square-list",
            template: template
                .replace("${length}", SquareListService.get().length)
                .replace("${squares}", SquareListService.get().map(() => `<square></square>`).join("")),
            components: SquareListService.get()
                .map(square => new SquareComponent(square))
                .concat([new SquareNavigationComponent])
        });
        SquareService.attach(service => this.onSquare(service.get()));
    }

    onInit() {
        this.id = this.id || 0;
        this.square = SquareService.get();
    }

    onUpdate() {
        const carrousel = window.document.querySelector(`${this.selector} .caroussel`);
        window.ontouchstart = e => this.onMouseDown(carrousel, e.touches[0].clientX);
        window.ontouchend = () => this.onMouseUp(carrousel);
    }

    onSquare(square) {
        this.id = window.clearTimeout(this.id);
        const carrousel = window.document.querySelector(`${this.selector} .caroussel`);
        window.ontouchstart = window.ontouchend = window.ontouchmove = carrousel.style.marginLeft = null;
        carrousel.className = carrousel.className.replace(
            `target-${this.square.level.number}`,
            `target-${square.level.number}`
        );
        this.square = square;
        this.id = window.setTimeout(() => this.onUpdate(), 500);
    }

    onMouseDown(carrousel, positionX) {
        const squares = SquareListService.get();
        const width = carrousel.clientWidth / squares.length;
        const maximum = width * (squares.indexOf(squares.find(square => !square.score.hit)));
        carrousel.style.transition = "unset";
        carrousel.style.marginLeft = window.getComputedStyle(carrousel).getPropertyValue("margin-left");
        window.ontouchmove = e => this.onMouseMove(
            carrousel,
            Number.parseInt(carrousel.style.marginLeft, 10) + (e.touches[0].clientX - positionX),
            width,
            maximum,
            positionX = e.touches[0].clientX
        );
    }

    onMouseMove(carrousel, marginLeft, width, maximum) {
        const absoluteMarginLeft = Math.abs(marginLeft);
        if (0 > marginLeft
            && absoluteMarginLeft < maximum
            && carrousel.clientWidth - width > absoluteMarginLeft
            && absoluteMarginLeft + width > 0) {
            carrousel.style.marginLeft = marginLeft + "px";
        }
    }

    onMouseUp(carrousel) {
        const squares = SquareListService.get();
        const width = carrousel.clientWidth / squares.length;
        const absoluteMarginLeft = Math.abs(Number.parseInt(carrousel.style.marginLeft, 10));
        const target = absoluteMarginLeft / width;
        const key = squares.indexOf(this.square);
        const difference = target - key;
        carrousel.style.transition = "margin-left .5s ease-out";
        SquareService.set(squares[
            key < target && 0.1 < difference ? key + 1 : (
                key > target && -0.1 > difference ? key - 1 : key
            )
        ]);
    }

}
