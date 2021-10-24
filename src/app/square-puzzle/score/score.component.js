import { Component } from 'babel-skeleton';

import { template } from './score.component.html';

import { ScoreService } from '../../shared/services/score.service';
import { ResumeService } from '../shared/resume.service';

export class ScoreComponent extends Component {

    constructor() {
        super({ selector: 'score', template });
        this.resumeListener = (service) => service.resume ? this.onPause() : this.onResume();
        this.scoreListener = () => this.onPause();
    }

    onInit() {
        this.onPause();
        this.interval = null;
        ScoreService.start();
        ResumeService.attach(this.resumeListener);
        ScoreService.attach(this.scoreListener);
    }

    onUpdate() {
        this.score = window.document.querySelector(`${this.selector} .time`);
        this.score.innerHTML = ScoreService.time;
    }

    onDestroy() {
        this.onPause();
        ScoreService.stop();
        ResumeService.detach(this.resumeListener);
        ScoreService.detach(this.scoreListener);
    }

    onPause() {
        if (this.interval) {
            window.clearInterval(this.interval);
            this.interval = null;
        }
    }

    onResume() {
        if (!this.interval) {
            this.decrement();
        }
    }

    decrement() {
        this.interval = window.setInterval(() => {
            this.score.innerHTML = --ScoreService.time;
            if (0 === ScoreService.time) {
                this.onDestroy();
            }
        }, 1000);
    }

}
