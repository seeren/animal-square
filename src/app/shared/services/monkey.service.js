import { Service } from 'babel-skeleton';

export const MonkeyService = new class extends Service {

    constructor() {
        super();
        this.state = null;
        this.number = null;
    }

    hit() {
        this.notify(this.state = "hit");
    }

    start(number) {
        this.number = number;
        this.notify(this.state = "start");
    }

    stop() {
        this.notify(this.state = "stop");
    }

    pause() {
        this.notify(this.state = "pause");
    }

    resume() {
        this.notify(this.state = "resume");
    }

}
