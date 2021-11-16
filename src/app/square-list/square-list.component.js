import { Component } from 'babel-skeleton';

import { template } from './square-list.component.html';

import { SquareComponent } from './square/square.component';
import { SquareNavigationComponent } from './square-navigation/square-navigation.component';
import { SquareService } from '../shared/services/square.service';
import { SquareListService } from '../shared/services/square-list.service';
import { JungleSoundService } from '../shared/services/sounds/jungle-sound.service';
import { PageSoundService } from '../shared/services/sounds/page-sound.service';
import { WhipSoundService } from '../shared/services/sounds/whip-sound.service';
import { SoundService } from '../shared/services/sounds/sound.service';

export class SquareListComponent extends Component {

    constructor() {
        super({
            selector: 'square-list',
            template,
            components: SquareListService.get()
                .map((square) => new SquareComponent(square))
                .concat([new SquareNavigationComponent])
        });
        this.onSquareHandler = (service) => this.onSquare(service.get());
        this.onResizeHandler = () => this.onUpdate();
    }

    onInit() {
        this.onResume();
        WhipSoundService.play();
        SquareService.attach(this.onSquareHandler);
        this.square = SquareService.get();
        window.addEventListener('resize', this.onResizeHandler);
    }

    onDestroy() {
        this.onPause();
        SquareService.detach(this.onSquareHandler);
        window.removeEventListener('resize', this.onResizeHandler);
        window.ontouchstart = null;
        SoundService.clear();
    }

    onPause() {
        JungleSoundService.pause();
    }

    onResume() {
        JungleSoundService.visit();
    }

    onUpdate() {
        this.slider = window.document.querySelector(`${this.selector} .slider`);
        const actualSquare = SquareListService.get().find(square => !square.score.time);
        const width = this.slider.clientWidth / SquareListService.get().length;
        this.sliderAnimation = {
            width: width,
            maximum: width * (actualSquare
                ? SquareListService.get().indexOf(actualSquare)
                : SquareListService.get().length - 1)
        };
        window.ontouchstart = (e) => this.onTouchStart(e);
    }

    onSquare(square) {
        this.slider.style.transform = null;
        this.slider.removeAttribute('data-translateX');
        if (square !== this.square) {
            PageSoundService.play();
            this.slider.classList.replace(
                `slider-target-${this.square.level.number}`,
                `slider-target-${square.level.number}`
            );
            this.square = square;
        }
    }

    onTouchStart(touchStartEvent) {
        if (!touchStartEvent.target.classList.contains('previous')
            && !touchStartEvent.target.classList.contains('next')) {
            const lastTouch = { clientX: touchStartEvent.touches[0].clientX };
            const translateX = window.getComputedStyle(this.slider).getPropertyValue('transform').split(', ')[4];
            this.slider.style.transition = 'unset';
            this.slider.style.transform = `translateX(${translateX}px)`;
            this.slider.setAttribute('data-translateX', translateX);
            window.ontouchend = (e) => this.onTouchEnd(e);
            window.ontouchmove = (e) => this.onTouchMove(e, lastTouch);
        }
    }

    onTouchEnd() {
        window.ontouchmove = null;
        window.ontouchend = null;
        const targetSquareKey = Math.abs(this.slider.getAttribute('data-translateX')) / this.sliderAnimation.width;
        const actualSquareKey = SquareListService.get().indexOf(this.square);
        const difference = targetSquareKey - actualSquareKey;
        const legalSquareKey = actualSquareKey < targetSquareKey && 0.1 < difference
            ? actualSquareKey + 1
            : (actualSquareKey > targetSquareKey && -0.1 > difference ? actualSquareKey - 1 : actualSquareKey);
        this.slider.style.transition = null;
        SquareService.set(SquareListService.get()[legalSquareKey]);
    }

    onTouchMove(e, lastTouch) {
        let translateX = Number.parseInt(
            this.slider.getAttribute('data-translateX'),
            10
        ) + (e.touches[0].clientX - lastTouch.clientX);
        if (translateX < 0 && Math.abs(translateX) < this.sliderAnimation.maximum) {
            this.slider.style.transform = `translateX(${translateX}px)`;
            this.slider.setAttribute('data-translateX', translateX);
        }
        lastTouch.clientX = e.touches[0].clientX;
    }

}
