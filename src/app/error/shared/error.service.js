import { Service, RouterComponent } from 'babel-skeleton';

export const ErrorService = new class extends Service {

    /**
     * @constructor
     */
    constructor() {
        super();
        this.error = null;
    }

    /**
     * @param {Error} error 
     */
    set(error) {
        this.error = error;
        RouterComponent.navigate("error");
    }

    /**
     * @returns {Error}
     */
    get() {
        return this.error;
    }

}
