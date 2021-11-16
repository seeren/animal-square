import { Service } from 'babel-skeleton';

export const SoundService = new class extends Service {

    constructor() {
        super();
        this.clear();
    }

    clear() {
        this.players = {};
    }

    get(id, loop, volume) {
        if (!this.players[id]) {
            const player = new Audio();
            player.volume = volume;
            if (loop && !player.setAttribute('loop', 'loop')) {
                player.setAttribute('loop', 'loop');
            }
            this.players[id] = player;
        }
        return this.players[id];
    }

    play(id, src, loop = false, volume = 1, rewind = false) {
        const player = this.get(id, loop, volume);
        if (src !== player.src) {
            player.src = `dist/assets/mp4/${src}`;
        } 
        if (rewind === true) {
            player.currentTime = 0;
        }
        player.play();
        return player;
    }

    pause(id) {
        if (this.players[id]) {
            this.players[id].pause();
        }
    }

}
