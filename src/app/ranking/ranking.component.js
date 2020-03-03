import { Component } from "babel-skeleton";
import { template } from "./ranking.component.html";
    
export class RankingComponent extends Component {

    constructor() {
        super({
            selector: "ranking",
            template: template
        });
    }

}
