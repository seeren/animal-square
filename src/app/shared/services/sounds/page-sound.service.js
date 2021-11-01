import { Service } from 'babel-skeleton';

import { MultiSoundService } from './multi-sound.service';

export const PageSoundService = new class extends Service {

    play() {
        MultiSoundService.play('page', 'page.mp4');
    }

}
