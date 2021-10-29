import { Service } from 'babel-skeleton';

import { SoundService } from './sound.service';

export const MagicSoundService = new class extends Service {

    play() {
        SoundService.play('magic', `magic.mp4`);
    }

    pause() {
        SoundService.pause('magic');
    }

}
