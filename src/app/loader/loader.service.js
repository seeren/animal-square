import { Service } from 'babel-skeleton';

import { default as game } from './../../../config/game.json';

import { SquareListService } from '../shared/services/square-list.service';

export const LoaderService = new class extends Service {

    getImages() {
        const images = game.images;
        SquareListService.get().forEach((square) => {
            const basePath = `animals/${square.animal.name}/${square.animal.name}`;
            images.push(
                `${basePath}-background.jpg`,
                `${basePath}-black.png`,
                `${basePath}-color.png`,
                `${basePath}-square.jpg`
            );
            for (let index = 1; index < 16; index++) {
                images.push(`${basePath}-square-${index}.jpg`);
            }
        });
        return images;
    }

    getAudios() {
        return game.sounds;
    }

}
