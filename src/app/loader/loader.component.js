import { Component, RouterComponent } from "babel-skeleton";

import { template } from "./loader.component.html";
import { LoaderError } from "./shared/loader.error";
import { SquareListService } from "../shared/services/square-list.service";
import { ErrorService } from "../error/shared/error.service";
import { BirdSoundService } from "../shared/services/sounds/bird-sound.service";

export class LoaderComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "loader",
            template: template
        });
        this.done = 0;
        this.images = this.getImages();
        this.audios = this.getAudios();
    }

    /**
     * @fires
     */
    onInit() {
        if (!this.done) {
            window.setTimeout(() => {
                this.images.forEach(
                    image => this.getImage().src = `dist/assets/images/${image}`
                );
                this.audios.forEach(
                    audio => this.getAudio().src = `dist/assets/mp4/${audio}`
                );
            }, 1000);
        }
    }

    /**
     * @returns {String[]}
     */
    getImages() {
        const images = [
            "items/fires/fire-down-left.png",
            "items/fires/fire-down-right.png",
            "items/fires/fire-left-down.png",
            "items/fires/fire-left-up.png",
            "items/fires/fire-right-down.png",
            "items/fires/fire-right-up.png",
            "items/fires/fire-up-left.png",
            "items/fires/fire-up-right.png",
            "items/medails/medail-black.png",
            "items/medails/medail-bronze.png",
            "items/medails/medail-gold.png",
            "items/medails/medail-silver.png",
            "items/monkeys/monkey-right.png",
            "items/navigations/navigation-next.png",
            "items/navigations/navigation-previous.png",
            "items/navigations/navigation-previous.png",
        ];
        SquareListService.get().forEach(square => {
            const basePath = `animals/${square.animal.name}/${square.animal.name}`;
            images.push(
                `${basePath}-background.jpg`,
                `${basePath}-black.png`,
                `${basePath}-color.png`,
                `${basePath}-square.jpg`
            );
            for (let index = 1; index < 16; index++) {
                images.push(`${basePath}-square-${index}.jpg`);
            }
        });
        return images;
    }

    /**
     * @returns {String[]}
     */
    getAudios() {
        return [
            "bird-fail.mp4",
            "bird-signal.mp4",
            "bird-success.mp4",
            "magic.mp4",
            "monkey-hit.mp4",
            "monkey-start.mp4",
            "page.mp4",
            "puzzle.mp4",
            "square.mp4",
            "visit.mp4",
            "whip.mp4",
        ];
    }

    /**
     * @returns {Image}
     */
    getImage() {
        const image = new Image;
        image.onerror = () => this.onError(image.src);
        image.onload = () => this.onLoad();
        return image;
    }

    /**
     * @returns {Audio}
     */
    getAudio() {
        const audio = new Audio;
        audio.onerror = () => this.onError(audio.src);
        audio.oncanplaythrough = () => this.onLoad();
        return audio;
    }

    /**
     * @event
     */
    onLoad() {
        if (!ErrorService.get()) {
            this.done = (this.done + (
                100 / (this.images.length + this.audios.length) * 100 / 100
            )) * 100 / 100;
            this.update();
        }
    }

    /**
     * @event
     * @param {String} src 
     */
    onError(src) {
        ErrorService.set(new LoaderError(src));
    }

    /**
     * @event
     */
    visit() {
        BirdSoundService.signal();
        RouterComponent.navigate("square-list");
    }

}
