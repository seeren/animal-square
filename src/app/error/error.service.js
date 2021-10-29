import { Service, RouterComponent } from 'babel-skeleton';

export const ErrorService = new class extends Service {

    constructor() {
        super();
        this.error = null;
    }

    set(error) {
        this.error = error;
        RouterComponent.navigate("error");
    }

    get() {
        return this.error;
    }

}
