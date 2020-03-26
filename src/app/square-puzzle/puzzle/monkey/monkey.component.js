import { Component } from "babel-skeleton";

import { template } from "./monkey.component.html";
import { MonkeyService } from "../../shared/monkey.service";
import { MonkeySoundService } from "../../../shared/services/sounds/monkey-sound.service";
import { ResumeService } from "../../shared/resume.service";

export class MonkeyComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "monkey",
            template: template
        });
        this.monkeyListener = (service) => this[service.state] ? this[service.state]() : null;
        this.resumeListener = (service) => service.resume ? this.onPause() : this.onResume();
    }

    /**
     * @fires
     */
    onInit() {
        this.monkey = null;
        this.duration = 0;
        this.delay = 0;
        this.interval = 0;
        MonkeyService.attach(this.monkeyListener);
        ResumeService.attach(this.resumeListener);
    }

    /**
     * @fires
     */
    onDestroy() {
        window.clearInterval(this.interval);
        MonkeyService.detach(this.monkeyListener);
        MonkeyService.state = null;
    }

    /**
     * @fires
     */
    onUpdate(element) {
        this.monkey = element;
        this.duration = window.parseFloat(
            window.getComputedStyle(element).getPropertyValue("animation-duration"), 10
        ) * 1000;
        this.delay = this.duration;
    }

    /**
     * @fires
     */
    onPause() {
        if (this.delay !== this.duration) {
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
        const halfDuration = this.duration / 2;
        return window.setInterval(() => {
            this.delay -= 100;
            if (halfDuration === this.delay) {
                MonkeySoundService.hit();
                MonkeyService.hit();
            } else if (0 >= this.delay) {
                window.clearInterval(this.interval);
                this.delay = this.duration;
            }
        }, 100);
    }

    /**
     * @event
     */
    start() {
        if (this.delay === this.duration) {
            MonkeySoundService.start();
            this.monkey.className = `monkey-${MonkeyService.number}`;
            this.interval = this.runInterval();
        }
    }

    /**
     * @event
     */
    stop() {
        this.monkey.className = ``;
    }

}
