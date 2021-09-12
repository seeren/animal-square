import { Service } from 'babel-skeleton';

import { SoundService } from './sound.service';

export const BirdSoundService = new class extends Service {

    signal() {
        SoundService.play("bird", `bird-signal.mp4`);
    }

    success() {
        SoundService.play("bird", `bird-success.mp4`, true).volume = .7;
    }

    fail() {
        SoundService.play("bird", `bird-fail.mp4`, true).volume = 1;
    }

    pause() {
        SoundService.pause("bird");
    }

    resume() {
        if (SoundService.players.bird) {
            -1 === SoundService.players.bird.src.indexOf("success")
                ? this.fail()
                : this.success();
        }
    }

}
