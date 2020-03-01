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
    push(id) {
        this.players[id] = window.document.createElement("audio");
        this.players[id].id = id;
        window.document.body.appendChild(this.players[id]);
        this.players[id].volume = 1;
        return this.players[id];
    }

    /**
     * @param {String} id 
     * @param {String} src 
     */
    play(id, src) {
        (this.players[id] || this.push(id)).src = `${this.baseDir}/${src}`;
        this.players[id].play();
    }

    /**
     * @param {String} id 
     */
    pause() {
        this.players[id].pause();
        this.players[id];
    }

}
