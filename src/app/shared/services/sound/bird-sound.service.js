import { Service } from 'babel-skeleton';
import { SoundService } from './sound.service';

export const BirdSoundService = new class extends Service {

    constructor() {
        super();
    }

    /**
     * @returns {void} 
     */
    play() {
        SoundService.play("bird", `bird.mp4`);
    }

}
