import { Component, RouterComponent } from 'babel-skeleton';

import { template } from './square-navigation.component.html';

import { SquareService } from '../../shared/services/square.service';
import { SquareListService } from '../../shared/services/square-list.service';
import { PageSoundService } from '../../shared/services/sounds/page-sound.service';

export class SquareNavigationComponent extends Component {

    constructor() {
        super({ selector: 'square-navigation', template });
        this.onSquareHandler = () => this.onSquare(SquareService.get());
    }

    onInit() {
        SquareService.attach(this.onSquareHandler);
        this.square = SquareService.get();
        this.next = SquareListService.hasNext(this.square);
        this.previous = SquareListService.hasPrevious(this.square);
        this.length = SquareListService.get().length;
    }

    onDestroy() {
        SquareService.detach(this.onSquareHandler);
    }

    onSquare(square) {
        if (square !== this.square) {
            this.onDestroy();
            this.onInit();
            this.update();
        }
    }

    slide(offset) {
        PageSoundService.play();
        SquareService.set(SquareListService.find(this.square.level.number + offset));
    }

    ranking() {
        RouterComponent.navigate('ranking');
    }

}
