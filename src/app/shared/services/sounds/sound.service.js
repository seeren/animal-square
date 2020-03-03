import { Service } from 'babel-skeleton';

export const SoundService = new class extends Service {

    constructor() {
        super();
        this.players = {};
        this.baseDir = "dist/assets/mp4";
    }

    /**
     * @param {String} id 
     * @returns {HTMLAudioElement}
     */
    get(id) {
        return this.players[id] || this.push(id);
    }

    /**
     * @param {String} id
     * @returns {HTMLAudioElement}
     */
    push(id) {
        const player = window.document.createElement("audio");
        player.id = id;
        window.document.body.appendChild(player);
        player.volume = 1;
        return this.players[id] = player;
    }

    /**
     * @param {String} id 
     * @param {String} src 
     * @param {Boolean} loop 
     * @returns {HTMLAudioElement}
     */
    play(id, src, loop) {
        const player = this.get(id);
        player.src = `${this.baseDir}/${src}`;
        loop ? player.setAttribute("loop", "loop") : player.removeAttribute("loop");
        player.play();
        return player;
    }

    /**
     * @param {String} id 
     * @returns {HTMLAudioElement}
     */
    pause(id) {
        const player = this.get(id);
        player.pause();
        return player;
    }

}
