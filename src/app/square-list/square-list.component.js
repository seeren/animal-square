import { Component } from "babel-skeleton";

import { template } from "./square-list.component.html";
import { SquareComponent } from "./square/square.component";
import { SquareListService } from "../shared/services/square-list.service";
import { SquareService } from "../shared/services/square.service";
import { SquareNavigationComponent } from "./square-navigation/square-navigation.component";
import { Square } from "../shared/models/square.model";
import { JungleSoundService } from "../shared/services/sounds/jungle-sound.service";
import { PageSoundService } from "../shared/services/sounds/page-sound.service";
import { WhipSoundService } from "../shared/services/sounds/whip-sound.service";

export class SquareListComponent extends Component {

    /**
     * @constructor
     */
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
        this.listener = service => this.onSquare(service.get());
    }

    /**
     * @fires
     */
    onInit() {
        WhipSoundService.play();
        JungleSoundService.visit();
        this.timeout = this.timeout || 0;
        this.square = SquareService.get();
        SquareService.attach(this.listener);
    }

    /**
     * @fires
     */
    onDestroy() {
        JungleSoundService.pause();
        this.timeout = window.clearTimeout(this.timeout);
        window.ontouchstart = window.ontouchmove = window.ontouchend = null;
        SquareService.detach(this.listener);
    }

    /**
     * @fires
     */
    onUpdate() {
        const slider = window.document.querySelector(`${this.selector} .slider`);
        window.ontouchstart = e => this.onTouchStart(slider, e.touches[0].clientX);
        window.ontouchend = () => this.onTouchEnd(slider);
    }

    /**
     * @event
     * @param {Square} square 
     */
    onSquare(square) {
        this.timeout = window.clearTimeout(this.timeout);
        const slider = window.document.querySelector(`${this.selector} .slider`);
        slider.style.marginLeft = window.ontouchstart = window.ontouchmove = window.ontouchend = null;
        slider.className = slider.className.replace(
            `target-${this.square.level.number}`,
            `target-${square.level.number}`
        );
        this.square = square;
        this.timeout = window.setTimeout(() => this.onUpdate(), 500);
    }

    /**
     * @event
     * @param {HTMLElement} slider 
     * @param {Number} clientX 
     */
    onTouchStart(slider, clientX) {
        const squares = SquareListService.get();
        const width = slider.clientWidth / squares.length;
        const actualSquare = squares.find(square => !square.score.time)
        slider.style.transition = "unset";
        slider.style.marginLeft = window.getComputedStyle(slider).getPropertyValue("margin-left");
        window.ontouchmove = e => this.onTouchMove(
            slider,
            Number.parseInt(slider.style.marginLeft, 10) + (e.touches[0].clientX - clientX),
            width,
            width * (actualSquare ? squares.indexOf(actualSquare) : squares.length - 1),
            clientX = e.touches[0].clientX
        );
    }

    /**
     * @event
     * @param {HTMLElement} slider 
     * @param {Number} marginLeft 
     * @param {Number} width 
     * @param {Number} maximum 
     */
    onTouchMove(slider, marginLeft, width, maximum) {
        const absoluteMarginLeft = Math.abs(marginLeft);
        if (0 > marginLeft
            && absoluteMarginLeft < maximum
            && slider.clientWidth - width > absoluteMarginLeft
            && absoluteMarginLeft + width > 0) {
            slider.style.marginLeft = marginLeft + "px";
        }
    }

    /**
     * @event
     * @param {HTMLElement} slider 
     */
    onTouchEnd(slider) {
        const squares = SquareListService.get();
        const width = slider.clientWidth / squares.length;
        const absoluteMarginLeft = Math.abs(Number.parseInt(slider.style.marginLeft, 10));
        const target = absoluteMarginLeft / width;
        const key = squares.indexOf(this.square);
        const difference = target - key;
        const targetKey = key < target && 0.1 < difference ? key + 1 : (
            key > target && -0.1 > difference ? key - 1 : key
        );
        slider.style.transition = null;
        if (key !== targetKey) {
            PageSoundService.play();
        }
        SquareService.set(squares[targetKey]);
    }

}
