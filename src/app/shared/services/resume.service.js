import { Service } from 'babel-skeleton';

export const ResumeService = new class extends Service {

    constructor() {
        super();
        this.resume = false;
    }

    get() {
        return this.resume;
    }

    toogle() {
        this.notify(this.resume = !this.resume);
        return this.resume;
    }

}
