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
        ScoreService.start(200);
        ResumeService.attach(this.resumeListener);
        ScoreService.attach(this.scoreListener);
    }

    onDestroy() {
        this.onPause();
        ScoreService.stop();
        ResumeService.detach(this.resumeListener);
        ScoreService.detach(this.scoreListener);
    }

    onUpdate() {
        const score = window.document.querySelector(`${this.selector} .time`);
        score.innerHTML = ScoreService.time;
        this.interval = window.setInterval(() => {
            score.innerHTML = --ScoreService.time;
            if (0 === ScoreService.time) {
                this.onDestroy();
            }
        }, 1000);
    }

    onPause() {
        if (this.interval) {
            window.clearInterval(this.interval);
            this.interval = null;
        }
    }

    onResume() {
        if (!this.interval) {
            this.onUpdate();
        }
    }

}
