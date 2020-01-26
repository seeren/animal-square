import { Component, RouterComponent } from "babel-skeleton";

import { template } from "./loader.component.html";
import { LoaderError } from "./shared/errors/loader.error";
import { SquareListService } from "../shared/services/square-list.service";
import { ErrorService } from "../error/shared/services/error.service";

export class LoaderComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "loader",
            template: template
        });
        this.timeout = 0;
        this.done = 0;
        this.images = []
    }

    /**
     * @fires
     */
    onInit() {
        if (!this.done) {
            const basePath = `dist/assets/images/`;
            [
                "fires/fire-down-left",
                "fires/fire-down-right",
                "fires/fire-left-down",
                "fires/fire-left-up",
                "fires/fire-right-down",
                "fires/fire-right-up",
                "fires/fire-up-left",
                "fires/fire-up-right",
                "medails/medail-black",
                "medails/medail-bronze",
                "medails/medail-gold",
                "medails/medail-silver",
                "navigations/navigation-next",
                "navigations/navigation-previous"
            ].forEach(item => this.images.push(`${basePath}items/${item}.png`));
            SquareListService.get().forEach(square => {
                const basePathAnimal = `${basePath}animals/${square.animal.name}/${square.animal.name}`;
                this.images.push(
                    `${basePathAnimal}-background.jpg`,
                    `${basePathAnimal}-black.png`,
                    `${basePathAnimal}-color.png`,
                    `${basePathAnimal}-square.jpg`
                );
                for (let index = 1; index < 16; index++) {
                    this.images.push(`${basePathAnimal}-square-${index}.jpg`);
                }
            });
            this.images.push(`${basePath}animal-square.png`);
            window.setTimeout(() => this.images.forEach(image => this.getImage().src = image), 1000);
        }
    }

    /**
     * @event
     */
    visit() {
        RouterComponent.navigate("square-list");
    }

    /**
     * @returns {Image}
     */
    getImage() {
        const image = new Image;
        image.onerror = () => {
            window.clearTimeout(this.timeout);
            ErrorService.set(new LoaderError(image.src)
            )
        };
        image.onload = () => this.onLoad();
        return image;
    }

    /**
     * @event
     */
    onLoad() {
        if (!ErrorService.get()) {
            this.done = (this.done + (100 / this.images.length * 100 / 100)) * 100 / 100;
            this.update();
        }
    }

    /**
     * @event
     */
    onError() {
        ErrorService.set(new LoaderError(image.src));
    }

}
