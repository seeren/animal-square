import { PuzzleTranslation } from './puzzle-translation.model';

export class PuzzleDirection extends PuzzleTranslation {

    constructor(x, y, axe, positive, distance = null) {
        super(x, y);
        this.axe = axe;
        this.positive = positive;
        this.distance = distance;
    }

}
