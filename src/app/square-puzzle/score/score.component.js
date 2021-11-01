import { Component } from 'babel-skeleton';

import { template } from './score.component.html';

import { ScoreService } from './score.service';
import { SquarePuzzleService } from '../square-puzzle.service';

export class ScoreComponent extends Component {

    constructor() {
        super({ selector: 'score', template });
        this.squarePuzzleListener = () => SquarePuzzleService.isStart()
            ? this.onResume()
            : this.onPause()
    }

    onInit() {
        this.interval = null;
        ScoreService.time = 200;
        SquarePuzzleService.attach(this.squarePuzzleListener);
    }

    onUpdate() {
        this.score = window.document.querySelector(`${this.selector} .time`);
        this.score.innerHTML = ScoreService.time;
    }

    onDestroy() {
        this.onPause();
        SquarePuzzleService.detach(this.squarePuzzleListener);
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
                SquarePuzzleService.stop();
            }
        }, 1000);
    }

}
