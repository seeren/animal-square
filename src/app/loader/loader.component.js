import { Component, RouterComponent } from "babel-skeleton";
import { template } from "./loader.component.html";
import { SquareListService } from "../../shared/services/square-list.service";
import { LoaderError } from "../../shared/errors/loader.error";
import { ErrorService } from "../../shared/services/error.service";

const done = Math.trunc(100 / (
    SquareListService.get().length * (16 + 1)
) * 100) / 100;

export class LoaderComponent extends Component {

    constructor() {
        super({
            selector: "loader",
            template: template
        });
        this.done = 0;
    }

    onInit() {
        window.setTimeout(() => this.load(), 1000);
    }

    load() {
        SquareListService.get().forEach(square => {
            const name = square.animal.name;
            const basePath = `assets/images/animals/${name}/${name}`;
            this.getImage().src = `${basePath}-background.jpg`;
            for (let index = 1; index < 16 + 1; index++) {
                this.getImage().src = `${basePath}-square-${index}.jpg`;
            }
        });
    }

    getImage() {
        let image = new Image;
        image.onload = () => this.onLoad();
        image.onerror = () => this.onError(image);
        return image;
    }

    onLoad() {
        if (!ErrorService.get()) {
            this.done = Math.trunc((this.done + done) * 100) / 100;
            this.update();
        }
    }

    onError(image) {
        ErrorService.set(new LoaderError(image.src));
        RouterComponent.navigate("error");
    }

    play() { }

}
