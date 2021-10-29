import { Service } from 'babel-skeleton';

import { SoundService } from './sound.service';

export const JungleSoundService = new class extends Service {

    visit() {
        SoundService.play('jungle', 'visit.mp4', true).volume = .6;
    }

    puzzle() {
        SoundService.play('jungle', 'puzzle.mp4', true).volume = 1;
    }

    pause() {
        SoundService.pause('jungle');
    }

}
