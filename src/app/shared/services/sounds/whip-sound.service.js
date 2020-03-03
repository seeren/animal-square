import { Service } from 'babel-skeleton';

import { SoundService } from './sound.service';

export const WhipSoundService = new class extends Service {

    /**
     * @returns {void} 
     */
    play() {
        SoundService.play("whip", `whip.mp4`);
    }

}
