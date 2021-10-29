import { Service } from 'babel-skeleton';

import { SoundService } from './sound.service';

export const MonkeySoundService = new class extends Service {

    start() {
        SoundService.play('monkey', 'monkey-start.mp4', false, .6);
    }

    hit() {
        SoundService.play('monkey', 'monkey-hit.mp4', false, 1);
    }

}
