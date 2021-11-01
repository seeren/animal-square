import { Component, RouterComponent } from 'babel-skeleton';

import { template } from './resume.component.html';

import { SquareService } from '../../shared/services/square.service';
import { BirdSoundService } from '../../shared/services/sounds/bird-sound.service';
import { SquarePuzzleService } from '../square-puzzle.service';

export class ResumeComponent extends Component {

    constructor() {
        super({ selector: 'resume', template });
    }

    onInit() {
        this.square = SquareService.get();
        this.pause = SquarePuzzleService.isPause();
    }

    toogle() {
        if (SquarePuzzleService.isStart()) {
            BirdSoundService.signal();
            SquarePuzzleService.pause();
            return this.pause = true;
        } else if (SquarePuzzleService.isPause()) {
            SquarePuzzleService.start();
            return this.pause = false;
        }
    }

    exit() {
        SquarePuzzleService.state = SquarePuzzleService.stop;
        RouterComponent.navigate('square-list');
    }

}
