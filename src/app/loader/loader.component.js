import { Component, RouterComponent } from "babel-skeleton";
import { template } from "./loader.component.html";
import { SquareListService } from "../../shared/services/square-list.service";
import { LoaderError } from "../../shared/errors/loader.error";

const squareItem = 16;
const waitTime = 1000;
const done = Math.trunc(100 / (
    SquareListService.get().length * (squareItem + 1)
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
        window.setTimeout(() => this.load(), waitTime);
    }

    getAnimalBasePath(animal) {
        return `assets/images/animals/${animal.name}/${animal.name}`;
    }

    getImage() {
        let image = new Image;
        image.onload = () => this.onLoad();
        image.onerror = () => this.onError(image);
        return image;
    }

    load() {
        SquareListService.get().forEach(square => {
            this.getImage().src = `${
                this.getAnimalBasePath(square.animal)
                }-background.jpg`;
            for (let index = 1; index < squareItem + 1; index++) {
                this.getImage().src = `${
                    this.getAnimalBasePath(square.animal)
                    }-square-${index}.jpg`;
            }
        });
    }

    onLoad() {
        this.done = Math.trunc((this.done + done) * 100) / 100;
        this.update();
    }

    onError(image) {
        throw new LoaderError(image.src)
    }

    onComplete() {
        console.log("redirect");
    }

    onUpdate() {
        if (100 === Math.round(this.done)) {
            window.setTimeout(() => this.onComplete(), waitTime);
        }
    }

}
