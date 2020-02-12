import { Component } from "babel-skeleton";
import { template } from "./monkey.component.html";
import { MonkeyService } from "../../../shared/services/monkey.service";

export class MonkeyComponent extends Component {

    constructor() {
        super({
            selector: "monkey",
            template: template
        });
        this.listener = (service) => {
            if (this[service.state]) {
                const monkey = window.document.querySelector(this.selector);
                this[service.state](
                    monkey,
                    service.number,
                    parseFloat(window.getComputedStyle(monkey).getPropertyValue("animation-duration"), 10) * 1000
                );
            }
        }
    }

    /**
     * @fires
     */
    onInit() {
        MonkeyService.attach(this.listener);
    }

    /**
     * @fires
     */
    onDestroy() {
        MonkeyService.detach(this.listener);
    }

    /**
     * @param {HTMLElement} monkey 
     * @param {Number} number 
     * @param {Number} duration 
     */
    start(monkey, number, duration) {
        monkey.className = `monkey-${number}`;
        window.setTimeout(() => MonkeyService.hit(), duration / 2);
    }

    /**
     * @param {HTMLElement} monkey 
     */
    pause(monkey) {
        if (-1 === monkey.className.indexOf(" pause")) {
            monkey.className += " pause";
        }
    }

    /**
     * @param {HTMLElement} monkey 
     */
    resume(monkey) {
        monkey.className = monkey.className.replace(" pause", "");
    }

}
