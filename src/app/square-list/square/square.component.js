import { Component, RouterComponent } from 'babel-skeleton';

import { template } from './square.component.html';

import { NoticeComponent } from '../../shared/components/notice/notice.component';
import { ScoreService } from '../../shared/services/score.service';
import { WhipSoundService } from '../../shared/services/sounds/whip-sound.service';

export class SquareComponent extends Component {

    constructor(square) {
        super({ selector: 'square', template, components: [
                new NoticeComponent
            ]
        });
        this.square = square;
        this.notice = this.components[0];
        this.notice.onclick = () => this.visit();
    }

    onInit() {
        this.timeout = null;
        this.medail = ScoreService.medail(this.square.score.time);
    }

    onDestroy() {
        this.onPause();
    }

    onUpdate() {
        this.notice.background = `animals/${
            this.square.animal.name}/${
            this.square.animal.name}-${
            this.square.score.time ? `color` : `black`
        }.png`;
        this.notice.show('Visit');
    }

    onPause() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
        }
    }

    onResume() {
        if (this.timeout) {
            this.navigate(500);
        }
    }

    visit() {
        if (!this.timeout) {
            WhipSoundService.play();
            this.navigate(this.notice.hide());
        }
    }

    navigate(duration) {
        this.timeout = window.setTimeout(
            () => RouterComponent.navigate('square-puzzle', { id: this.square.level.number }),
            duration
        );
    }

}
