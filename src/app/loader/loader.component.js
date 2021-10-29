import { Component, RouterComponent } from 'babel-skeleton';

import { template } from './loader.component.html';

import { LoaderError } from './loader.error';
import { LoaderService } from './loader.service';
import { BirdSoundService } from '../shared/services/sounds/bird-sound.service';
import { ErrorService } from '../error/error.service';

export class LoaderComponent extends Component {

    constructor() {
        super({ selector: 'loader', template });
        this.done = 0;
        this.images = LoaderService.getImages();
        this.audios = LoaderService.getAudios();
    }

    onUpdate() {
        if (!this.done) {
            this.images.forEach((image) => this.getImage(`dist/assets/images/${image}`));
            this.audios.forEach((audio) => this.getAudio(`dist/assets/mp4/${audio}`));
        }
    }

    getImage(src) {
        const image = new Image;
        image.onerror = () => this.onError(image.src);
        image.onload = () => this.onLoad();
        image.src = src;
        return image;
    }

    getAudio(src) {
        const audio = new Audio;
        audio.onerror = () => this.onError(audio.src);
        audio.oncanplaythrough = () => this.onLoad();
        audio.src = src;
        audio.load();
        return audio;
    }

    onLoad() {
        if (!ErrorService.get()) {
            this.done = (this.done + (
                100 / (this.images.length + this.audios.length) * 100 / 100
            )) * 100 / 100;
            this.update();
        }
    }

    onError(src) {
        ErrorService.set(new LoaderError(src));
    }

    visit() {
        BirdSoundService.signal();
        RouterComponent.navigate('square-list');
    }

}
