import { Component } from "babel-skeleton";

import { template } from "./square-list.component.html";

import { SquareComponent } from "./square/square.component";
import { SquareListService } from "../shared/services/square-list.service";
import { SquareService } from "../shared/services/square.service";
import { SquareNavigationComponent } from "./square-navigation/square-navigation.component";
import { JungleSoundService } from "../shared/services/sounds/jungle-sound.service";
import { PageSoundService } from "../shared/services/sounds/page-sound.service";
import { WhipSoundService } from "../shared/services/sounds/whip-sound.service";

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
        WhipSoundService.play();
        JungleSoundService.visit();
        SquareService.attach(this.onSquareHandler);
        window.addEventListener('resize', this.onResizeHandler);
        this.square = SquareService.get();
    }
    
    onDestroy() {
        JungleSoundService.pause();
        SquareService.detach(this.onSquareHandler);
        window.removeEventListener('resize', this.onResizeHandler);
        window.ontouchstart = null;
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
        this.slider.removeAttribute('data-translateX')
        this.slider.classList.replace(`slider-target-${this.square.level.number}`, `slider-target-${square.level.number}`);
        this.square = square;
    }

    onTouchStart(e) {
        if (!e.target.classList.contains('previous') && !e.target.classList.contains('next')) {
            this.slider.style.transition = 'unset';
            let translateX = window.getComputedStyle(this.slider).getPropertyValue('transform').split(', ')[4];
            this.setTranslateX(translateX);
            let clientX = e.touches[0].clientX;
            window.ontouchend = (e) => this.onTouchEnd(e);
            window.ontouchmove = (e) => {
                translateX = Number.parseInt(this.slider.getAttribute('data-translateX'), 10) + (e.touches[0].clientX - clientX);
                this.move(translateX);
                clientX = e.touches[0].clientX;
            }
        }
    }

    onTouchEnd() {
        window.ontouchmove = null;
        window.ontouchend = null;
        const target = Math.abs(this.slider.getAttribute('data-translateX')) / this.sliderAnimation.width;
        const key = SquareListService.get().indexOf(this.square);
        const difference = target - key;
        const targetKey = key < target && 0.1 < difference 
            ? key + 1
            : (key > target && -0.1 > difference ? key - 1 : key);
        this.slider.style.transition = null;
        if (key !== targetKey) {
            PageSoundService.play();
        }
        SquareService.set(SquareListService.get()[targetKey]);
    }

    move(translateX) {
        if (translateX < 0 && Math.abs(translateX) < this.sliderAnimation.maximum){
            this.setTranslateX(translateX);
        }
    }

    setTranslateX(translateX) {
        this.slider.style.transform = `translateX(${translateX}px)`;
        this.slider.setAttribute('data-translateX', translateX);
    }

}
