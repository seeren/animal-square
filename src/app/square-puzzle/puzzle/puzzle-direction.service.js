import { Service } from 'babel-skeleton';

import { PuzzleTranslation } from './puzzle-translation.model';
import { PuzzleDirection } from './puzzle-direction.model';

export const PuzzleDirectionService = new class extends Service {

    getDirection(event) {
        for (const direction of [
            new PuzzleDirection(event.x, event.y - event.target.clientHeight, 'y', false),
            new PuzzleDirection(event.x, event.y + event.target.clientHeight, 'y', true),
            new PuzzleDirection(event.x + event.target.clientWidth, event.y, 'x', true),
            new PuzzleDirection(event.x - event.target.clientWidth, event.y, 'x', false)
        ]) {
            if (0 === document.elementsFromPoint(
                direction.x,
                direction.y
            ).indexOf(event.target.parentNode)) {
                return direction;
            }
        }
    }

    getTranslation(cell) {
        const [, , , , translateX, translateY] = window.getComputedStyle(cell)
            .getPropertyValue('transform').split(', ');
        return new PuzzleTranslation(
            window.parseFloat(translateX, 10),
            window.parseFloat(translateY, 10)
        );
    }

    getTranslationEnd(value, minimum, maximum) {
        return minimum !== value
            ? (maximum === value || value - minimum < maximum - value ? minimum : maximum)
            : maximum
    }

}
