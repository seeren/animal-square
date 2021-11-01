import { Service } from 'babel-skeleton';

import { MultiSoundService } from './multi-sound.service';

export const SquareSoundService = new class extends Service {

    play() {
        this.player = MultiSoundService.play('square', 'square.mp4');
    }

}
