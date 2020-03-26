import { Component, RouterComponent } from "babel-skeleton";

import { template } from "./ranking.component.html";
import { NoticeComponent } from "../shared/components/notice/notice.component";
import { SquareListService } from "../shared/services/square-list.service";
import { ScoreService } from "../shared/services/score.service";
import { WhipSoundService } from "../shared/services/sounds/whip-sound.service";
import { BirdSoundService } from "../shared/services/sounds/bird-sound.service";

export class RankingComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "ranking",
            template: template,
            components: [
                new NoticeComponent
            ]
        });
        this.notice = this.components[0];
    }

    /**
     * @fires
     */
    onInit() {
        let black = 0;
        let gold = 0;
        let silver = 0;
        let bronze = 0;
        this.time = 0;
        SquareListService.get().forEach(square => {
            this.time += square.score.time;
            const medail = ScoreService.medail(square.score.time);
            "black" === medail ? black++ : ("gold" === medail
                ? gold++ : ("silver" === medail ? silver++ : bronze++));
        });
        this.medail = black > gold
            ? "black"
            : (gold > silver ? "gold" : (silver > bronze ? "silver" : "bronze"));
    }

    /**
     * @fires
     */
    onDestroy() {
        this.onPause();
    }

    /**
     * @fires
     */
    onPause() {
        BirdSoundService.pause();
    }

    /**
     * @fires
     */
    onResume() {
        BirdSoundService.success();
    }

    /**
     * @fires
     */
    onUpdate() {
        console.log(this.medail);

        WhipSoundService.play();
        BirdSoundService.success();
        this.notice.background = `items/medails/medail-${this.medail}.png`;
        this.notice.show(this.time);
    }

    /**
     * @event
     */
    back() {
        RouterComponent.navigate("square-list");
    }

}
