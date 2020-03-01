import { Service } from 'babel-skeleton';

export const ResumeService = new class extends Service {

    /**
     * @constructor
     */
    constructor() {
        super();
        this.resume = false;
    }

    /**
     * @returns {Boolean}
     */
    get() {
        return this.resume;
    }

    /**
     * @returns {Boolean}
     */
    toogle() {
        this.notify(this.resume = !this.resume);
        return this.get();
    }

}
