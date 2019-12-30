import { Component, RouterComponent } from "babel-skeleton";

import { template } from "./loader.component.html";
import { LoaderError } from "./shared/errors/loader.error";
import { SquareListService } from "../shared/services/square-list.service";
import { ErrorService } from "../error/shared/services/error.service";

export class LoaderComponent extends Component {

    constructor() {
        super({
            selector: "loader",
            template: template
        });
        this.done = 0;
        this.increment = Math.trunc(
            100 / (SquareListService.get().length * (16 + 1)) * 100
        ) / 100;
    }

    onInit() {
        if (!this.done) {
            window.setTimeout(() => this.load(), 1000)
        }
    }

    getImage() {
        const image = new Image;
        image.onload = () => this.onLoad();
        image.onerror = () => this.onError(image);
        return image;
    }

    load() {
        SquareListService.get().forEach(square => {
            const basePath = `assets/images/animals/${square.animal.name}/${square.animal.name}`;
            this.getImage().src = `${basePath}-background.jpg`;
            for (let index = 1; index < 16 + 1; index++) {
                this.getImage().src = `${basePath}-square-${index}.jpg`;
            }
        });
    }

    onLoad() {
        if (!ErrorService.get()) {
            this.done = Math.trunc((this.done + this.increment) * 100) / 100;
            this.update();
        }
    }

    onError(image) {
        ErrorService.set(new LoaderError(image.src));
    }

    visit() {
        RouterComponent.navigate("square-list");
    }

}
