import { Component, RouterComponent } from 'babel-skeleton';

import { template } from './square.component.html';

import { NoticeComponent } from '../../shared/components/notice/notice.component';
import { ScoreService } from '../../shared/services/score.service';
import { WhipSoundService } from '../../shared/services/sounds/whip-sound.service';

export class SquareComponent extends Component {

    constructor(square) {
        super({
            selector: 'square', template, components: [
                new NoticeComponent
            ]
        });
        this.square = square;
        this.notice = this.components[0];
        this.notice.onclick = () => this.visit();
    }

    onInit() {
        this.medail = ScoreService.getMedail(this.square.score.time);
    }

    onUpdate() {
        this.notice.background = `animals/${this.square.animal.name}/${this.square.animal.name}-${this.square.score.time
            ? `color`
            : `black`}.png`;
        this.notice.show('Visit');
    }

    visit() {
        WhipSoundService.play();
        this.notice.hide();
        this.notice.element.onanimationend = () => RouterComponent.navigate(
            'square-puzzle',
            { id: this.square.level.number }
        );
    }

}
