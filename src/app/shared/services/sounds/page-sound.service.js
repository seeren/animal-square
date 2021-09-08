import { Service } from 'babel-skeleton';

import { SoundService } from './sound.service';

export const PageSoundService = new class extends Service {

    play() {
        SoundService.play('page', 'page.mp4');
    }

}
