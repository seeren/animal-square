import { Component, RouterComponent } from "babel-skeleton";

import { template } from "./square-puzzle.component.html";
import { PuzzleComponent } from "./puzzle/puzzle.component";
import { ScoreComponent } from "./score/score.component";
import { ResumeComponent } from "./resume/resume.component";
import { SquareListService } from "../shared/services/square-list.service";
import { NoticeComponent } from "../shared/components/notice/notice.component";
import { DirectionService } from "../shared/services/direction.service";
import { MonkeyService } from "../shared/services/monkey.service";
import { ScoreService } from "../shared/services/score.service";
import { ResumeService } from "../shared/services/resume.service";
import { PuzzleService } from "../shared/services/puzzle.service";

export class SquarePuzzleComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "square-puzzle",
            template: template,
            components: [
                new ScoreComponent,
                new PuzzleComponent,
                new ResumeComponent,
                new NoticeComponent
            ]
        });
        this.puzzle = this.components[2];
        this.notice = this.components[3];
        this.monkeyListener = (service) => "hit" === service.state ? this.hit() : null;
        this.scoreListener = (service) => "stop" === service.state ? this.stop() : null;
        this.resumeListener = (service) => service.resume ? this.pause() : this.play();
    }

    /**
     * @fires
     */
    onInit() {
        this.timeout = 0;
        this.square = SquareListService.set(RouterComponent.get("id") || 1);
        MonkeyService.attach(this.monkeyListener);
        ScoreService.attach(this.scoreListener);
        ResumeService.attach(this.resumeListener);
    }

    /**
     * @fires
     */
    onDestroy() {
        this.timeout = window.clearTimeout(this.timeout);
        MonkeyService.detach(this.monkeyListener);
        ScoreService.detach(this.scoreListener);
        ResumeService.detach(this.resumeListener);
    }

    /**
     * @fires
     */
    onUpdate() {
        this.timeout = window.setTimeout(
            () => ScoreService.start(MonkeyService.start(15)),
            this.notice.scroll("Ready") * 3 / 4
        );
    }

    /**
     * @event
     */
    pause() {
        ScoreService.pause();
        MonkeyService.pause();
    }

    /**
     * @event
     */
    play() {
        if (MonkeyService.isPlayable()) {
            ScoreService.play();
            MonkeyService.play();
            this.timeout = window.setTimeout(() => {
                MonkeyService.isPlayable()
                    ? MonkeyService.start(MonkeyService.random())
                    : null
            }, (10 + Math.floor(Math.random() * Math.floor(30))) * 1000);
        }
    }

    /**
     * @event
     */
    stop() {
        this.pause();
        this.timeout = window.clearTimeout(this.timeout);
        if (ScoreService.time) {
            this.square.score.time = ScoreService.time;
        }
        const medail = ScoreService.medail(this.square);
        this.notice.background = `items/medails/medail-${medail}.png`;
        this.timeout = window.setTimeout(() => {
            const link = window.document.querySelector(`${this.selector} notice .text`);
            link.onclick = () => {
                link.onclick = null;
                MonkeyService.stop();
                window.document.querySelector(`${this.selector} puzzle`).className += " animate-hide";
                this.timeout = window.setTimeout(() => {
                    RouterComponent.navigate("square-list");
                }, this.notice.hide());
            }
        }, this.notice.show(ScoreService.time ? medail : "Timeout"));
    }

    /**
     * @event
     */
    hit() {
        if ("stop" !== ScoreService.state) {
            this.pause();
            const cel = MonkeyService.cel();
            if (cel && this.touch(cel, DirectionService.getTouchesEvent(cel))) {
                this.notice.pass("Ready" === this.notice.title ? "Go" : "Tap");
                return this.touches(this.notice.title === "Go"
                    // ? 10 + this.square.level.number
                    ? 1
                    : 1,
                    // : this.square.level.number,
                    PuzzleService.duration(cel) * 1000,
                );
            }
            this.play();
        }
    }

    /**
     * @param {HTMLElement} cel 
     * @param {TouchEvent} event 
     * @returns {Boolean} 
     */
    touch(cel, event) {
        cel.ontouchstart(event);
        return cel.ontouchend ? !cel.ontouchend() : false;
    }

    /**
     * @param {Number} limit 
     * @param {Number} hit 
     */
    touches(limit, interval, hit) {
        hit = ++hit || 1;
        this.timeout = window.setTimeout(() => {
            const cels = [];
            const events = [];
            for (const cel of window.document.querySelectorAll(`${this.selector} .cel`)) {
                const event = DirectionService.getTouchesEvent(cel);
                const number = window.parseInt(cel.className.substring(8, 10), 10);
                if (MonkeyService.number !== number && DirectionService.get(event).property) {
                    cels.push(cel);
                    events.push(event);
                }
            }
            const index = Math.floor(Math.random() * cels.length);
            this.touch(cels[index], events[index]);
            hit < limit ? this.touches(limit, interval, hit) : this.play()
        }, interval);
    }

}
