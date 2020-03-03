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
        this.puzzle = this.components[2];
        this.notice = this.components[3];
        this.monkeyListener = (service) => "hit" === service.state ? this.hit() : null;
        this.scoreListener = (service) => "stop" === service.state ? this.stop() : null;
        this.resumeListener = (service) => {
            if (service.resume) {
                JungleSoundService.pause();
                return this.pause()
            }
            JungleSoundService.puzzle();
            this.play()
        };
    }

    /**
     * @fires
     */
    onInit() {
        this.timeout = 0;
        this.monkeyTimeout = 0;
        this.square = SquareListService.set(RouterComponent.get("id") || 1);
        JungleSoundService.puzzle();
        MonkeyService.attach(this.monkeyListener);
        ScoreService.attach(this.scoreListener);
        ResumeService.attach(this.resumeListener);
    }

    /**
     * @fires
     */
    onDestroy() {
        this.timeout = window.clearTimeout(this.timeout);
        this.monkeyTimeout = window.clearTimeout(this.monkeyTimeout);
        JungleSoundService.pause();
        MonkeyService.detach(this.monkeyListener);
        ScoreService.detach(this.scoreListener);
        ResumeService.detach(this.resumeListener);
    }

    /**
     * @fires
     */
    onUpdate() {
        this.pause();
        WhipSoundService.play();
        window.setTimeout(() => MagicSoundService.play(), 500);
        this.monkeyTimeout = window.setTimeout(
            () => MonkeyService.start(15),
            this.notice.scroll("Ready") / 2
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
        if (!ResumeService.resume && "stop" !== ScoreService.state) {
            this.monkeyTimeout = window.clearTimeout(this.monkeyTimeout);
            ScoreService.play();
            MonkeyService.play();
            this.monkeyTimeout = window.setTimeout(
                () => !ResumeService.resume && "stop" !== ScoreService.state
                    ? MonkeyService.start(MonkeyService.random())
                    : null,
                (10 + Math.floor(Math.random() * Math.floor(30))) * 1000
            );
        }
    }

    /**
     * @event
     */
    stop() {
        this.timeout = window.clearTimeout(this.timeout);
        JungleSoundService.pause();
        WhipSoundService.play();
        if (ScoreService.time > this.square.score.time) {
            this.square.score.time = ScoreService.time;
            SquareListService.save();
        }
        ScoreService.time ? BirdSoundService.success() : BirdSoundService.fail();
        const medail = ScoreService.medail(ScoreService.time);
        this.notice.background = `items/medails/medail-${medail}.png`;
        this.timeout = window.setTimeout(() => {
            if (ScoreService.time) {
                MagicSoundService.play();
            }
            const link = window.document.querySelector(`${this.selector} notice .text`);
            link.onclick = () => {
                link.onclick = null;
                MonkeyService.stop();
                WhipSoundService.play();
                BirdSoundService.pause();
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
                WhipSoundService.play();
                this.notice.pass("Ready" === this.notice.title ? "Go" : "Hum");
                return this.touches(
                    this.notice.title === "Go"
                        ? 10 + this.square.level.number
                        : this.square.level.number,
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
        MonkeyService.number = PuzzleService.number(cel);
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
                if (MonkeyService.number !== PuzzleService.number(cel)
                    && DirectionService.get(event).property) {
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
