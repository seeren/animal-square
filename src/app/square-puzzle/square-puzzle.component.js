import { Component, RouterComponent } from "babel-skeleton";

import { template } from "./square-puzzle.component.html";
import { PuzzleComponent } from "./puzzle/puzzle.component";
import { ScoreComponent } from "./score/score.component";
import { ResumeComponent } from "./resume/resume.component";
import { SquareListService } from "../shared/services/square-list.service";
import { NoticeComponent } from "../shared/components/notice/notice.component";
import { DirectionService } from "./shared/direction.service";
import { MonkeyService } from "./shared/monkey.service";
import { ScoreService } from "../shared/services/score.service";
import { ResumeService } from "./shared/resume.service";
import { PuzzleService } from "./shared/puzzle.service";
import { WhipSoundService } from "../shared/services/sounds/whip-sound.service";
import { JungleSoundService } from "../shared/services/sounds/jungle-sound.service";
import { MagicSoundService } from "../shared/services/sounds/magic-sound.service";
import { BirdSoundService } from "../shared/services/sounds/bird-sound.service";

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
        this.notice = this.components[3];
        this.scoreListener = () => this.stop();
        this.monkeyListener = (service) => "hit" === service.state ? this.hit() : null;
        this.resumeListener = (service) => service.resume ? this.onPause() : this.onResume();
    }

    /**
     * @fires
     */
    onInit() {
        this.monkeyServiceTimeout = null;
        this.touchesTimeout = null;
        this.touchesLimit = null;
        this.touchDuration = null;
        this.timeout = 0;
        this.touchHit = 0;
        this.square = SquareListService.set(1);
        // this.square = SquareListService.set(RouterComponent.get("id") || 1);
        ScoreService.attach(this.scoreListener);
        MonkeyService.attach(this.monkeyListener);
        ResumeService.attach(this.resumeListener);
    }

    /**
     * @fires
     */
    onDestroy() {
        this.onPause();
        ScoreService.detach(this.scoreListener);
        MonkeyService.detach(this.monkeyListener);
        ResumeService.detach(this.resumeListener);
    }

    /**
     * @fires
     */
    onUpdate() {
        const noticeDelay = this.notice.scroll("Ready");
        JungleSoundService.puzzle();
        WhipSoundService.play();
        window.setTimeout(() => MagicSoundService.play(), noticeDelay / 3);
        this.monkeyServiceTimeout = window.setTimeout(() => MonkeyService.start(15), noticeDelay / 2);
        this.touchDuration = PuzzleService.duration() * 1000;
    }

    /**
     * @fires
     */
    onPause() {
        window.clearTimeout(this.timeout);
        window.clearTimeout(this.monkeyServiceTimeout);
        window.clearTimeout(this.touchesTimeout);
        JungleSoundService.pause();
        BirdSoundService.pause();
    }

    /**
     * @fires
     */
    onResume() {
        if ("stop" !== ScoreService.state) {
            JungleSoundService.puzzle();
            !MonkeyService.state ? MonkeyService.start(15) : this.runMonkey();
            if (0 !== this.touchHit) {
                this.touches();
            }
            return;
        }
        BirdSoundService.resume();
        if (this.timeout) {
            this.navigate(500);
        }
    }

    /**
     * @event
     */
    hit() {
        if ("stop" !== ScoreService.state) {
            const cel = MonkeyService.cel();
            if (cel && this.touch(cel, DirectionService.getTouchesEvent(cel))) {
                WhipSoundService.play();
                this.notice.pass("Ready" === this.notice.title ? "Go" : "Hum");
                this.touchesLimit = "Go" === this.notice.title
                    ? 10 + (this.square.level.number * 2)
                    : this.square.level.number * 2;
                return this.touches();
            }
            this.runMonkey();
        }
    }

    /**
     * @event
     * 
     * @param {HTMLElement} cel 
     * @param {TouchEvent} event 
     * @returns {Boolean} 
     */
    touch(cel, event) {
        MonkeyService.number = PuzzleService.number(cel);
        cel.ontouchstart(event);
        if (cel.ontouchend) {
            this.touchHit++;
            cel.ontouchend();
            return true;
        }
        return false;
    }

    /**
     * @event
     */
    touches() {
        this.touchesTimeout = window.setTimeout(() => {
            const cels = [];
            const events = [];
            for (const cel of window.document.querySelectorAll(`${this.selector} .cel`)) {
                const event = DirectionService.getTouchesEvent(cel);
                if (MonkeyService.number !== PuzzleService.number(cel)
                    && DirectionService.get(event).property) {
                    cels.push(cel);
                    events.push(event);
                }
            }
            const index = Math.floor(Math.random() * cels.length);
            this.touch(cels[index], events[index]);
            if (this.touchHit < this.touchesLimit) {
                return this.touches();
            }
            this.touchHit = 0;
            this.runMonkey();
        }, this.touchDuration);
    }

    /**
     * @event
     */
    runMonkey() {
        window.clearTimeout(this.monkeyServiceTimeout);
        this.monkeyServiceTimeout = window.setTimeout(
            () => MonkeyService.start(MonkeyService.random()),
            (10 + Math.floor(Math.random() * Math.floor(30))) * 1000
        );
    }

    /**
     * @event
     */
    stop() {
        this.onPause();
        WhipSoundService.play();
        if (ScoreService.time > this.square.score.time) {
            this.square.score.time = ScoreService.time;
            SquareListService.save();
            BirdSoundService.success();
        } else {
            BirdSoundService.fail();
        }
        const medail = ScoreService.medail(ScoreService.time);
        this.notice.background = `items/medails/medail-${medail}.png`;
        window.setTimeout(() => {
            if (ScoreService.time) {
                MagicSoundService.play();
            }
            const link = window.document.querySelector(`${this.selector} notice .text`);
            link.onclick = () => this.stopOnClick(link);
        }, this.notice.show(ScoreService.time ? medail : "Timeout") / 2);
    }

    /**
     * @event
     * @param {HTMLElement} link 
     */
    stopOnClick(link) {
        link.onclick = null;
        WhipSoundService.play();
        BirdSoundService.pause();
        window.document.querySelector(`${this.selector} puzzle`).className += " animate-hide";
        this.navigate(this.notice.hide());
    }

    /**
     * @event
     * @param {Number}
     */
    navigate(duration) {
        this.timeout = window.setTimeout(
            () => RouterComponent.navigate("square-list"),
            duration
        );
    }

}
