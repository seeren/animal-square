import { Component } from "babel-skeleton";

import { template } from "./app.component.html";

export class AppComponent extends Component {

    constructor() {
        super({selector: "app", template});
    }

}
