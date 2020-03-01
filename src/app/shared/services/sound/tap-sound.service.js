import { Service } from 'babel-skeleton';
import { SoundService } from './sound.service';

export const TapSoundService = new class extends Service {

    constructor() {
        super();
    }

    /**
     * @returns {void} 
     */
    play() {
        SoundService.play("tap", `tap.mp4`);
    }

}
