import { Service } from 'babel-skeleton';

export const ScoreService = new class extends Service {

    constructor() {
        super();
        this.time = 0;
    }

    getMedail(time) {
        return time
            ? time > 175 ? 'gold' : (time > 75 ? 'silver' : 'bronze')
            : 'black';
    }

}
