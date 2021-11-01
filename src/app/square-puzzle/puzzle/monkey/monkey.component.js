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
        this.monkey = null;
        this.interval = null;
        this.duration = null;
        this.delay = null;
        MonkeyService.attach(this.monkeyListener);
        SquarePuzzleService.attach(this.squarePuzzleListener);
    }

    onDestroy() {
        window.clearInterval(this.interval);
        MonkeyService.detach(this.monkeyListener);
        MonkeyService.state = null;
    }

    onUpdate(element) {
        this.monkey = element;
        this.duration = this.delay = window.parseFloat(
            window.getComputedStyle(element).getPropertyValue('animation-duration'), 10
        ) * 1000;
    }

    onPause() {
        if (this.delay !== this.duration) {
            window.clearInterval(this.interval);
            this.monkey.className += ' pause';
        }
    }

    onResume() {
        if (-1 !== this.monkey.className.indexOf(' pause')) {
            this.monkey.className = this.monkey.className.replace(' pause', '');
            this.interval = this.listenHit();
        }
    }

    start() {
        if (this.delay === this.duration) {
            MonkeySoundService.start();
            this.monkey.className = `monkey-${MonkeyService.number}`;
            this.interval = this.listenHit();
        }
    }

    stop() {
        this.monkey.className = '';
    }

    listenHit() {
        const halfDuration = this.duration / 2;
        return window.setInterval(() => {
            this.delay -= 100;
            if (halfDuration === this.delay) {
                MonkeySoundService.hit();
                MonkeyService.hit();
            } else if (0 >= this.delay) {
                window.clearInterval(this.interval);
                this.delay = this.duration;
            }
        }, 100);
    }

}
