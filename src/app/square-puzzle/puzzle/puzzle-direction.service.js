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
            const elements = document.elementsFromPoint(direction.x, direction.y);
            const parentIndex = elements.indexOf(event.target.parentNode);
            const target = elements[parentIndex - 1];
            if (-1 !== parentIndex && (!target || target.tagName !== event.target.tagName)) {
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
