import { Component, RouterComponent } from "babel-skeleton";

import { default as game } from './../../../config/game.json';
import { template } from "./loader.component.html";

import { LoaderError } from "./shared/loader.error";
import { SquareListService } from "../shared/services/square-list.service";
import { ErrorService } from "../error/shared/error.service";
import { BirdSoundService } from "../shared/services/sounds/bird-sound.service";

export class LoaderComponent extends Component {

    constructor() {
        super({
            selector: "loader",
            template: template
        });
        this.done = 0;
        this.images = this.getImages();
        this.audios = this.getAudios();
    }

    onInit() {
        if (!this.done) {
            window.setTimeout(() => {
                this.images.forEach((image) => this.getImage(`dist/assets/images/${image}`));
                this.audios.forEach((audio) => this.getAudio(`dist/assets/mp4/${audio}`));
            }, 1000);
        }
    }

    getImages() {
        const images = game.images;
        SquareListService.get().forEach((square) => {
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
    
    getAudios() {
        return game.sounds;
    }

    getImage(src) {
        const image = new Image;
        image.onerror = () => this.onError(image.src);
        image.onload = () => this.onLoad();
        image.src = src;
    }

    getAudio(src) {
        const audio = new Audio;
        audio.onerror = () => this.onError(audio.src);
        audio.oncanplaythrough = () => this.onLoad();
        audio.src = src;
        audio.load();
    }

    onLoad() {
        if (!ErrorService.get()) {
            this.done = (this.done + (
                100 / (this.images.length + this.audios.length) * 100 / 100
            )) * 100 / 100;
            this.update();
        } 
    }

    onError(src) {
        ErrorService.set(new LoaderError(src));
    }

    visit() {
        BirdSoundService.signal();
        RouterComponent.navigate("square-list");
    }

}
