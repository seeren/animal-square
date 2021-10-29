import { Component } from 'babel-skeleton';

import { template } from './error.component.html';

import { ErrorService } from './error.service';

export class ErrorComponent extends Component {

    constructor() {
        super({ selector: 'error', template });
    }

    onInit() {
        this.error = ErrorService.get();
    }

}
