import { Service } from 'babel-skeleton';

export const ScoreService = new class extends Service {

    constructor() {
        super();
        this.time = 0;
        this.state = null;
    }

    start(time = 200) {
        this.state = 'start';
        this.time = time;
    }

    stop() {
        this.state = 'stop';
        this.notify();
    }

    medail(time) {
        return time
            ? time > 175 ? 'gold' : (time > 75 ? 'silver' : 'bronze')
            : 'black';
    }

}
