import { Service } from 'babel-skeleton';

import { SoundService } from './sound.service';

export const SquareSoundService = new class extends Service {

    /**
     * @returns {void} 
     */
    play() {
        SoundService.play("square", `square.mp4`);
    }

}
