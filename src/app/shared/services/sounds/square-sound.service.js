import { Service } from 'babel-skeleton';

import { SoundService } from './sound.service';

export const SquareSoundService = new class extends Service {

    play() {
        SoundService.play('square', 'square.mp4');
    }

}
