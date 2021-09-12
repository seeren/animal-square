import { Component, RouterComponent } from 'babel-skeleton';

import { template } from './square-navigation.component.html';

import { SquareService } from '../../shared/services/square.service';
import { SquareListService } from '../../shared/services/square-list.service';
import { PageSoundService } from '../../shared/services/sounds/page-sound.service';

export class SquareNavigationComponent extends Component {

    constructor() {
        super({ selector: 'square-navigation', template });
        this.listner = service => this.onSquare(service.get());
    }

    onInit() {
        this.square = SquareService.get();
        this.next = SquareListService.hasNext(this.square);
        this.previous = SquareListService.hasPrevious(this.square);
        this.length = SquareListService.get().length;
        SquareService.attach(this.listner);
    }

    onDestroy() {
        SquareService.detach(this.listner);
    }

    onSquare(square) {
        if (this.square !== square) {
            this.onInit();
            this.update();
        }
    }

    slide(offset) {
        PageSoundService.play();
        const square = SquareListService.get().find(
            (square) => square.level.number === this.square.level.number + offset
        );
        SquareService.set(square);
    }

    ranking() {
        RouterComponent.navigate('ranking');
    }

}
