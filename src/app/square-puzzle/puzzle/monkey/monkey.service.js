import { Service } from 'babel-skeleton';

export const MonkeyService = new class extends Service {

    static start = 1;

    static hit = 2;

    constructor() {
        super();
        this.state = 0;
        this.number = 0;
    }

    hit() {
        this.state = this.hit;
        this.notify();
    }

    isHit() {
        return this.hit === this.state;
    }

    start(number) {
        this.number = number;
        this.state = this.start;
        this.notify();
    }

    isStart() {
        return this.start === this.state;
    }

    random() {
        let number = this.number;
        while (number === this.number) {
            number = Math.floor(Math.random() * Math.floor(14)) + 1;
        }
        return number;
    }

    getCell() {
        const shape = window.document.querySelector('monkey').getBoundingClientRect();
        return window.document.elementsFromPoint(
            shape.x + 5,
            shape.y + 5
        ).find(element => -1 !== element.className.indexOf('cel cel-'));
    }

}
