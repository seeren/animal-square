import { Service } from 'babel-skeleton';

export const SoundService = new class extends Service {

    constructor() {
        super();
        this.players = {};
    }

    get(id, volume) {
        if (!this.players[id]) {
            const player = window.document.createElement('audio');
            player.volume = volume;
            this.players[id] = player;
        }
        return this.players[id];
    }

    play(id, src, loop = false, volume = 1) {
        const player = this.get(id, volume);
        if (src !== player.src) {
            player.src = `dist/assets/mp4/${src}`;
        }
        if (loop && !player.setAttribute('loop', 'loop')) {
            player.setAttribute('loop', 'loop');
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
