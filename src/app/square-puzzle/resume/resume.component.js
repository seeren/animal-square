import { Component, RouterComponent } from 'babel-skeleton';

import { template } from './resume.component.html';

import { ResumeService } from '../shared/resume.service';
import { SquareService } from '../../shared/services/square.service';
import { BirdSoundService } from '../../shared/services/sounds/bird-sound.service';

export class ResumeComponent extends Component {

    constructor() {
        super({ selector: 'resume', template });
    }

    onInit() {
        this.square = SquareService.get();
        this.resume = ResumeService.get();
    }

    onDestroy() {
        if (ResumeService.get()) {
            this.toogle();
        }
    }

    toogle() {
        if (!ResumeService.get()) {
            BirdSoundService.signal();
        }
        return this.resume = ResumeService.toogle();
    }

    exit() {
        RouterComponent.navigate('square-list');
    }

}
