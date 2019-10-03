import { Component } from "babel-skeleton";
import { template } from "./square-list.component.html";
    
export class SquareListComponent extends Component {

    constructor() {
        super({
            selector: "square-list",
            template: template
        });
    }

}
