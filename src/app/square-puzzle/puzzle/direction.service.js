import { Service } from 'babel-skeleton';

// import { Direction } from '../../shared/models/direction.model';
// import { Translation } from '../../shared/models/translation';

export const DirectionService = new class extends Service {

    getTouchesEvent(element) {
        const shape = element.getBoundingClientRect();
        const x = shape.x + shape.width / 2;
        const y = shape.y + shape.height / 2;
        return { target: element, touches: [{ clientX: x, clientY: y }], x: x, y: y };
    }






}
