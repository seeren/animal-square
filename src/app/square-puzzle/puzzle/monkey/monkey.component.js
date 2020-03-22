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
        this.monkey = null;
        this.duration = 0;
        this.delay = 0;
        this.interval = 0;
        MonkeyService.attach(this.listener);
    }

    /**
     * @fires
     */
    onDestroy() {
        window.clearInterval(this.interval);
        MonkeyService.detach(this.listener);
    }

    /**
     * @fires
     */
    onUpdate(element) {
        this.monkey = element;
        this.duration = window.parseFloat(
            window.getComputedStyle(element).getPropertyValue("animation-duration"), 10
        ) * 1000;
        this.delay = this.duration / 2;
    }

    /**
     * @fires
     */
    onPause() {
        if (this.delay !== this.duration / 2) {
            window.clearInterval(this.interval);
            this.monkey.className += " pause";
        }
    }

    /**
     * @fires
     */
    onResume() {
        if (-1 !== this.monkey.className.indexOf(" pause")) {
            this.monkey.className = this.monkey.className.replace(" pause", "");
            this.interval = this.runInterval();
        }
    }

    /**
     * @return {Number}
     */
    runInterval() {
        return window.setInterval(() => {
            this.delay -= 100;
            if (0 === this.delay) {
                window.clearInterval(this.interval);
                MonkeySoundService.hit();
                MonkeyService.hit();
                this.delay = this.duration / 2;
            }
        }, 100);
    }

    /**
     * @event
     */
    start() {
        MonkeySoundService.start();
        this.monkey.className = `monkey-${MonkeyService.number}`;
        this.interval = this.runInterval();
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
    play() {
        this.onResume();
    }

    /**
     * @event
     */
    pause() {
        this.onPause();
    }

}
