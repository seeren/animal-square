import { Service } from 'babel-skeleton';

export const ScoreService = new class extends Service {

    constructor() {
        super();
        this.time = 0;
        this.state = null;
    }

    start() {
        this.state = 'start';
    }

    stop() {
        this.state = 'stop';
        this.notify();
    }

    medail(time) {
        return time
            ? time > 175 
                ? 'gold'
                : (time > 50 
                    ? 'silver' 
                    : 'bronze')
            : 'black';
    }

}
