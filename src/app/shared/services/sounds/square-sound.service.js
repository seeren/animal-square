import { Service } from 'babel-skeleton';

import { SoundService } from './sound.service';

export const SquareSoundService = new class extends Service {

    play() {
        this.player = SoundService.play('square', 'square.mp4', false, 1, true);
    }

}
