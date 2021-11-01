import { Component } from 'babel-skeleton';

import { template } from './monkey.component.html';

import { MonkeyService } from './monkey.service';
import { MonkeySoundService } from '../../../shared/services/sounds/monkey-sound.service';
import { SquarePuzzleService } from '../../square-puzzle.service';

export class MonkeyComponent extends Component {

    constructor() {
        super({ selector: 'monkey', template });
        this.monkeyListener = (service) => service.isStart() ? this.start() : null;
        this.squarePuzzleListener = () => SquarePuzzleService.isStart()
            ? this.onResume()
            : SquarePuzzleService.isPause() && this.onPause();
    }

    onInit() {
        MonkeyService.attach(this.monkeyListener);
        SquarePuzzleService.attach(this.squarePuzzleListener);
    }

    onDestroy() {
        MonkeyService.detach(this.monkeyListener);
        MonkeyService.state = null;
    }

    onUpdate(element) {
        this.monkey = element;
    }

    onPause() {
        if (-1 === this.monkey.className.indexOf(' pause')) {
            this.monkey.className += ' pause';
        }
    }

    onResume() {
        if (-1 !== this.monkey.className.indexOf(' pause')) {
            this.monkey.className = this.monkey.className.replace(' pause', '');
        }
    }

    onAnimationEnd() {
        MonkeyService.hit();
        this.monkey.className = this.monkey.className.replace('enter', 'leave');
        this.monkey.onanimationend = null;
    }

    start() {
        if (this.delay === this.duration) {
            MonkeySoundService.start();
            this.monkey.className = `monkey-enter-${MonkeyService.number}`;
            this.monkey.onanimationend = () => this.onAnimationEnd();
        }
    }

}
