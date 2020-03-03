import { Component } from "babel-skeleton";

import { template } from "./monkey.component.html";
import { MonkeyService } from "../../shared/monkey.service";
import { MonkeySoundService } from "../../../shared/services/sounds/monkey-sound.service";

export class MonkeyComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "monkey",
            template: template
        });
        this.listener = (service) => this[service.state] ? this[service.state]() : null;
    }

    /**
     * @fires
     */
    onInit() {
        this.timeout = 0
        MonkeyService.attach(this.listener);
    }
    /**
     * @fires
     */
    onUpdate(element) {
        this.monkey = element;
        this.duration = window.parseFloat(window.getComputedStyle(element).getPropertyValue("animation-duration"), 10) * 1000
    }

    /**
     * @fires
     */
    onDestroy() {
        this.timeout = window.clearTimeout(this.timeout);
        MonkeyService.detach(this.listener);
    }

    /**
     * @event
     */
    stop() {
        this.monkey.className = ``;
    }

    /**
     * @event
     */
    start() {
        MonkeySoundService.start();
        this.play();
        this.monkey.className = `monkey-${MonkeyService.number}`;
        this.timeout = window.setTimeout(() => {
            MonkeySoundService.hit();
            MonkeyService.hit();
        }, this.duration / 2);
    }

    /**
     * @event
     */
    play() {
        this.monkey.className = this.monkey.className.replace(" pause", "");
    }

    /**
     * @event
     */
    pause() {
        if (-1 === this.monkey.className.indexOf(" pause")) {
            this.monkey.className += " pause";
        }
    }

}
