import { Service } from 'babel-skeleton';

import { SoundService } from './sound.service';

export const MonkeySoundService = new class extends Service {

    /**
     * @returns {void} 
     */
    start() {
        SoundService.play("monkey", `monkey-start.mp4`).volume = .6;
    }

    /**
     * @returns {void} 
     */
    hit() {
        SoundService.play("monkey", `monkey-hit.mp4`).volume = 1;
    }

}
