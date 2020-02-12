import { Service } from 'babel-skeleton';

export const MonkeyService = new class extends Service {

    constructor() {
        super();
        this.state = null;
    }

    start() {
        this.notify(this.state = "start");
    }

    hit() {
        this.notify(this.state = "hit");
    }

    stop() {
        this.notify(this.state = "stop");
    }

}
