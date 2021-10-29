import { Service } from 'babel-skeleton';

import { SoundService } from './sound.service';

export const WhipSoundService = new class extends Service {

    play() {
        SoundService.play('whip', 'whip.mp4');
    }

}
