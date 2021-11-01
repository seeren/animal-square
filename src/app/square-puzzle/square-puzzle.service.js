import { Service } from 'babel-skeleton';

export const SquarePuzzleService = new class extends Service {

    static start = 1;

    static pause = 2;

    static stop = 3;

    constructor() {
        super();
        this.state = this.stop;
    }

    start() {
        this.state = this.start;
        this.notify();
    }

    isStart() {
        return this.start === this.state;
    }

    pause() {
        this.state = this.pause;
        this.notify();
    }

    isPause() {
        return this.pause === this.state;
    }

    stop() {
        this.state = this.stop;
        this.notify();
    }

    isStop() {
        return this.stop === this.state;
    }

}
