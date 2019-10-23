import { Service } from 'babel-skeleton';

export const ErrorService = new class extends Service {

    constructor() {
        super();
        this.error = null;
    }

    set(error) {
        this.error = error;
    }

    get() {
        return this.error;
    }

}
