import { Component } from 'babel-skeleton';

import { template } from './puzzle.component.html';

import { MonkeyComponent } from './monkey/monkey.component';
import { PuzzleDirectionService } from './puzzle-direction.service';
import { SquareService } from '../../shared/services/square.service';
import { SquareSoundService } from '../../shared/services/sounds/square-sound.service';
import { PuzzleTouchService } from './puzzle-touch.service';

export class PuzzleComponent extends Component {

    constructor() {
        super({
            selector: 'puzzle', template, components: [
                new MonkeyComponent
            ]
        });
    }

    onInit() {
        this.square = SquareService.get();
    }

    onUpdate() {
        window.document.querySelectorAll(`${this.selector} .cel`).forEach(
            (cel) => cel.ontouchstart = () => this.onTouchStart(PuzzleTouchService.getTouchEvent(cel))
        );
    }

    onTouchStart(touchStartEvent) {
        if (!PuzzleTouchService.isEnd()) {
            return;
        }
        const direction = PuzzleDirectionService.getDirection(touchStartEvent);
        if (direction) {
            PuzzleTouchService.start();
            const cell = touchStartEvent.target;
            const translation = PuzzleDirectionService.getTranslation(cell);
            const minimum = direction.positive
                ? translation[direction.axe]
                : translation[direction.axe] - cell.clientHeight;
            const maximum = direction.positive
                ? translation[direction.axe] + cell.clientHeight
                : translation[direction.axe];
            cell.className += ` fire ${direction.axe}-${direction.positive}`;
            cell.style.transform = `translate(${translation.x}px, ${translation.y}px)`;
            cell.style.transition = 'unset';
            cell.setAttribute('data-x', translation.x);
            cell.setAttribute('data-y', translation.y);
            cell.ontouchend = () => this.onTouchEnd(cell, direction, minimum, maximum, translation);
            cell.ontouchmove = (e) => this.onTouchMove(e, cell, direction, minimum, maximum, touchStartEvent);
        }
    }

    onTouchMove(e, cell, direction, minimum, maximum, touchStartEvent) {
        const target = window.parseFloat(cell.getAttribute(`data-${direction.axe}`), 10) + direction.distance;
        cell.setAttribute(
            `data-${direction.axe}`,
            target > minimum ? (target > maximum ? maximum : target) : minimum
        );
        cell.style.transform = `translate(${cell.getAttribute('data-x')}px, ${cell.getAttribute('data-y')}px)`;
        const upperCaseProperty = direction.axe.toUpperCase();
        direction.distance = e.touches[0][`client${upperCaseProperty}`] - touchStartEvent[direction.axe];
        touchStartEvent[direction.axe] = e.touches[0][`client${upperCaseProperty}`];
    }

    onTouchEnd(cell, direction, minimum, maximum, initial) {
        SquareSoundService.play();
        cell.ontouchend = cell.ontouchmove = cell.style.transition = null;
        cell.ontransitionend = () => {
            cell.className = cell.className.replace(` fire ${direction.axe}-${direction.positive}`, '');
            cell.removeAttribute('data-x');
            cell.removeAttribute('data-y');
            // TODO stop game on puzzle complete otherwise toogle animable
            PuzzleTouchService.end();
        };
        const updatedAxe = window.parseFloat(cell.getAttribute(`data-${direction.axe}`), 10);
        cell.setAttribute(
            `data-${direction.axe}`,
            PuzzleDirectionService.getTranslationEnd(updatedAxe, minimum, maximum)
        );
        updatedAxe === initial[direction.axe] || (updatedAxe !== maximum && updatedAxe !== minimum)
            ? cell.style.transform = `translate(${cell.getAttribute('data-x')}px, ${cell.getAttribute('data-y')}px)`
            : cell.ontransitionend();

    }

}
