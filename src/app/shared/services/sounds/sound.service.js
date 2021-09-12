import { Service } from 'babel-skeleton';

export const SoundService = new class extends Service {

    constructor() {
        super();
        this.players = {};
    }

    get(id) {
        if (!this.players[id]) {
            this.players[id] = [];
        }
        const player = window.document.createElement('audio');
        player.volume = 1;
        this.players[id].push(player);
        return player;
    }

    play(id, src, loop) {
        const player = this.get(id);
        player.src = `dist/assets/mp4/${src}`;
        if (loop) {
            player.setAttribute('loop', 'loop');
        }
        player.onended = () => this.players[id].splice(this.players[id].indexOf(player), 1);
        player.play();
        return player;
    }

    pause(id) {
        this.players[id].forEach((player) => player.pause());
        if (this.players[id].length > 1) {
            this.players[id].splice(-1);
        }
        return this.players[id][0];
    }

}
