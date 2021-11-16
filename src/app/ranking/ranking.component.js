import { Component, RouterComponent } from 'babel-skeleton';

import { template } from './ranking.component.html';

import { NoticeComponent } from '../shared/components/notice/notice.component';
import { SquareListService } from '../shared/services/square-list.service';
import { WhipSoundService } from '../shared/services/sounds/whip-sound.service';
import { BirdSoundService } from '../shared/services/sounds/bird-sound.service';
import { ScoreService } from '../square-puzzle/score/score.service';
import { SoundService } from '../shared/services/sounds/sound.service';

export class RankingComponent extends Component {

    constructor() {
        super({
            selector: 'ranking', template, components: [
                new NoticeComponent
            ]
        });
        this.notice = this.components[0];
    }

    onInit() {
        let black = 0;
        let gold = 0;
        let silver = 0;
        let bronze = 0;
        this.time = 0;
        SquareListService.get().forEach((square) => {
            this.time += square.score.time;
            const medail = ScoreService.getMedail(square.score.time);
            'black' === medail ? black++ : (
                'gold' === medail ? gold++ : (
                    'silver' === medail ? silver++ : bronze++));
        });
        this.medail = black > gold ? 'black' : (
            gold > silver ? 'gold' : (
                silver > bronze ? 'silver' : 'bronze'));
    }

    onDestroy() {
        this.onPause();
        SoundService.clear();
    }

    onPause() {
        BirdSoundService.pause();
    }

    onResume() {
        BirdSoundService.success();
    }

    onUpdate() {
        WhipSoundService.play();
        BirdSoundService.success();
        this.notice.background = `items/medails/medail-${this.medail}.png`;
        this.notice.show(this.time);
    }

    back() {
        RouterComponent.navigate('square-list');
    }

}
