import { Service } from 'babel-skeleton';

import { SoundService } from './sound.service';

export const JungleSoundService = new class extends Service {

    /**
     * @returns {void} 
     */
    visit() {
        SoundService.play("jungle", `visit.mp4`, true).volume = .6;
    }

    /**
     * @returns {void} 
     */
    puzzle() {
        -1 === SoundService.players["jungle"].src.indexOf("puzzle")
            ? SoundService.play("jungle", `puzzle.mp4`, true).volume = 1
            : SoundService.get("jungle").play();
    }

    /**
     * @returns {void} 
     */
    pause() {
        SoundService.pause("jungle");
    }

}
