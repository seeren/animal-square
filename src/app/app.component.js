import { Component } from "babel-skeleton";

import { template } from "./app.component.html";

export class AppComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "app",
            template: template
        });
    }

}
