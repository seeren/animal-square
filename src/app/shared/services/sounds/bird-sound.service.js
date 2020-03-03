import { Service } from 'babel-skeleton';

import { SoundService } from './sound.service';

export const BirdSoundService = new class extends Service {

    /**
     * @returns {void} 
     */
    signal() {
        SoundService.play("bird", `bird-signal.mp4`);
    }

    /**
     * @returns {void} 
     */
    success() {
        SoundService.play("bird", `bird-success.mp4`, true).volume = .7;
    }

    /**
     * @returns {void} 
     */
    fail() {
        SoundService.play("bird", `bird-fail.mp4`, true).volume = 1;
    }

    /**
     * @returns {void} 
     */
    pause() {
        SoundService.pause("bird");
    }

}
