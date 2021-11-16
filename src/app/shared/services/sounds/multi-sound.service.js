import { Service } from 'babel-skeleton';

export const MultiSoundService = new class extends Service {

    constructor() {
        super();
        this.players = {};
    }

    get(id, volume) {
        if (!this.players[id]) {
            this.players[id] = [];
        }
        const player = new Audio();
        player.volume = volume;
        this.players[id].push(player);
        return player;
    }

    play(id, src, volume = 1) {
        const player = this.get(id, volume);
        if (src !== player.src) {
            player.src = `dist/assets/mp4/${src}`;
        }
        player.onended = () => this.players[id].splice(this.players[id].indexOf(player), 1);
        player.play();
        return player;
    }

    pause(id) {
        if (this.players[id]) {
            this.players[id].forEach((player) => player.pause())
        }
    }

}
