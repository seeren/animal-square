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
        const slider = window.document.querySelector(`${this.selector} .slider`);
        window.ontouchstart = e => this.onMouseDown(slider, e.touches[0].clientX);
        window.ontouchend = () => this.onMouseUp(slider);
    }

    onSquare(square) {
        this.id = window.clearTimeout(this.id);
        const slider = window.document.querySelector(`${this.selector} .slider`);
        window.ontouchstart = window.ontouchend = window.ontouchmove = slider.style.marginLeft = null;
        slider.className = slider.className.replace(
            `target-${this.square.level.number}`,
            `target-${square.level.number}`
        );
        this.square = square;
        this.id = window.setTimeout(() => this.onUpdate(), 500);
    }

    onMouseDown(slider, positionX) {
        const squares = SquareListService.get();
        const width = slider.clientWidth / squares.length;
        const maximum = width * (squares.indexOf(squares.find(square => !square.score.hit)));
        slider.style.transition = "unset";
        slider.style.marginLeft = window.getComputedStyle(slider).getPropertyValue("margin-left");
        window.ontouchmove = e => this.onMouseMove(
            slider,
            Number.parseInt(slider.style.marginLeft, 10) + (e.touches[0].clientX - positionX),
            width,
            maximum,
            positionX = e.touches[0].clientX
        );
    }

    onMouseMove(slider, marginLeft, width, maximum) {
        const absoluteMarginLeft = Math.abs(marginLeft);
        if (0 > marginLeft
            && absoluteMarginLeft < maximum
            && slider.clientWidth - width > absoluteMarginLeft
            && absoluteMarginLeft + width > 0) {
            slider.style.marginLeft = marginLeft + "px";
        }
    }

    onMouseUp(slider) {
        const squares = SquareListService.get();
        const width = slider.clientWidth / squares.length;
        const absoluteMarginLeft = Math.abs(Number.parseInt(slider.style.marginLeft, 10));
        const target = absoluteMarginLeft / width;
        const key = squares.indexOf(this.square);
        const difference = target - key;
        slider.style.transition = null;
        SquareService.set(squares[
            key < target && 0.1 < difference ? key + 1 : (
                key > target && -0.1 > difference ? key - 1 : key
            )
        ]);
    }

}
