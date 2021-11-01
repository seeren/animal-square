import { Component, RouterComponent } from 'babel-skeleton';

import { template } from './square-puzzle.component.html';

import { PuzzleComponent } from './puzzle/puzzle.component';
import { ScoreComponent } from './score/score.component';
import { ResumeComponent } from './resume/resume.component';
import { SquareListService } from '../shared/services/square-list.service';
import { NoticeComponent } from '../shared/components/notice/notice.component';
import { MonkeyService } from './puzzle/monkey/monkey.service';
import { WhipSoundService } from '../shared/services/sounds/whip-sound.service';
import { JungleSoundService } from '../shared/services/sounds/jungle-sound.service';
import { MagicSoundService } from '../shared/services/sounds/magic-sound.service';
import { BirdSoundService } from '../shared/services/sounds/bird-sound.service';
import { SquareService } from '../shared/services/square.service';
import { PuzzleService } from './puzzle/puzzle.service';
import { PuzzleTouchService } from './puzzle/puzzle-touch.service';
import { PuzzleDirectionService } from './puzzle/puzzle-direction.service';
import { SquarePuzzleService } from './square-puzzle.service';
import { ScoreService } from './score/score.service';

export class SquarePuzzleComponent extends Component {

    constructor() {
        super({
            selector: 'square-puzzle',
            template: template,
            components: [
                new ScoreComponent,
                new PuzzleComponent,
                new ResumeComponent,
                new NoticeComponent
            ]
        });
        this.notice = this.components[3];
        this.monkeyListener = (service) => service.isHit() && this.onHit();
        this.puzzleTouchListner = (service) => service.isEnd() && this.onTouchEnd();
        this.squarePuzzleListener = () => SquarePuzzleService.isStart() ? this.onResume() : (
            SquarePuzzleService.isPause() ? this.onPause() : this.onStop()
        );
    }

    onInit() {
        this.timeoutList = { monkey: null };
        this.hitCount = null;
        SquareService.set(this.square = SquareListService.find(RouterComponent.get('id')));
        MonkeyService.attach(this.monkeyListener);
        PuzzleTouchService.attach(this.puzzleTouchListner);
        SquarePuzzleService.attach(this.squarePuzzleListener);
    }

    onDestroy() {
        this.onPause();
        MonkeyService.detach(this.monkeyListener);
        PuzzleTouchService.detach(this.puzzleTouchListner);
        SquarePuzzleService.detach(this.squarePuzzleListener);
    }

    onUpdate() {
        JungleSoundService.puzzle();
        WhipSoundService.play();
        this.notice.scroll('Ready');
        this.notice.element.onanimationend = () => {
            this.notice.element.onanimationend = () => this.notice.element.className = 'none';
            this.notice.element.onanimationend();
            MonkeyService.start(15);
        };
        window.setTimeout(() => MagicSoundService.play(), 1000);
        this.hitCount = 0;
    }

    onPause() {
        JungleSoundService.pause();
        BirdSoundService.pause();
        window.clearTimeout(this.timeoutList.monkey);
    }

    onResume() {
        JungleSoundService.puzzle();
        if (SquarePuzzleService.isStart()) {
            this.runMonkey();
        } else if (SquarePuzzleService.isStop()) {
            BirdSoundService.resume();
        }
    }

    onHit() {
        const cell = MonkeyService.getCell();
        if (!cell || !this.touch(cell)) {
            this.runMonkey();
            return;
        }
        WhipSoundService.play();
        if ('Ready' === this.notice.title) {
            this.notice.pass('Go');
            this.hitCount = 10 + this.square.level.number * 2;
        } else {
            this.hitCount = this.square.level.number * 2;
        }
    }

    onTouchEnd() {
        if (!this.hitCount) {
            SquarePuzzleService.isStart() || SquarePuzzleService.start()
            this.runMonkey();
            return;
        }
        const cellList = [];
        this.hitCount = this.hitCount - 1;
        window.document.querySelectorAll(`${this.selector} .cel`).forEach((cell) => {
            if (MonkeyService.number !== PuzzleService.getCellNumber(cell)
                && PuzzleDirectionService.getDirection(PuzzleTouchService.getTouchEvent(cell))) {
                cellList.push(cell);
            }
        });
        this.touch(cellList[Math.floor(Math.random() * cellList.length)]);
    }

    touch(cell) {
        cell.ontouchstart(null, true);
        if (cell.ontouchend) {
            cell.ontouchend();
            return true;
        }
        return false;
    }

    runMonkey() {
        window.clearTimeout(this.timeoutList.monkey);
        this.timeoutList.monkey = window.setTimeout(
            () => MonkeyService.start(MonkeyService.random()),
            // 5000
            (10 + Math.floor(Math.random() * Math.floor(30))) * 1000
        );
    }

    onStop() {
        this.onPause();
        WhipSoundService.play();
        if (ScoreService.time > this.square.score.time) {
            this.square.score.time = ScoreService.time;
            SquareListService.save();
            BirdSoundService.success();
        } else {
            BirdSoundService.fail();
        }
        const medail = ScoreService.getMedail(ScoreService.time);
        this.notice.background = `items/medails/medail-${medail}.png`;
        this.notice.show(ScoreService.time ? medail : 'Fail');
        this.notice.element.onanimationend = null;
        window.setTimeout(() => {
            if (ScoreService.time) {
                MagicSoundService.play();
            }
            const link = window.document.querySelector(`${this.selector} notice .text`);
            link.onclick = () => this.exit(link);
        }, 1500);
    }

    exit(link) {
        link.onclick = null;
        WhipSoundService.play();
        window.document.querySelector(`${this.selector} puzzle`).className += ' animate-hide';
        this.notice.hide();
        this.notice.element.onanimationend = () => RouterComponent.navigate('square-list');
    }

}
