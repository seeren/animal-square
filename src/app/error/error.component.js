import { Component } from "babel-skeleton";

import { template } from "./error.component.html";
import { ErrorService } from "./shared/services/error.service";

export class ErrorComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "error",
            template: template
        });
    }

    /**
     * @fires
     */
    onInit() {
        this.error = ErrorService.get();
    }

}
