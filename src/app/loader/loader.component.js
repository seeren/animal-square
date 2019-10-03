import { Component, RouterComponent } from "babel-skeleton";
import { template } from "./loader.component.html";

export class LoaderComponent extends Component {

    constructor() {
        super({
            selector: "loader",
            template: template
        });
    }

    onUpdate() {
        RouterComponent.navigate("square-list")
    }

}
