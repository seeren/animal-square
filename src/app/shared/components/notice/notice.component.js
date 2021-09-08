import { Component } from 'babel-skeleton';

import { template } from './notice.component.html';

import { Notice } from '../../models/notice.model';

export class NoticeComponent extends Component {

    constructor() {
        super({ selector: 'notice', template });
        this.notice = new Notice;
        this.element = null;
        this.onclick = null;
    }

    set title(title) {
        this.notice.title = title;
    }

    get title() {
        return this.notice.title;
    }

    set background(background) {
        this.notice.background = background;
    }

    onInit() {
        this.title = this.notice.title || 'Notice';
        this.background = null;
    }

    onUpdate(element) {
        this.element = element;
        if (this.notice.background) {
            this.element.style.backgroundImage = `url('dist/assets/images/${this.notice.background}')`;
        }
    }

    onPause() {
        if (-1 === this.element.className.indexOf(' pause')) {
            this.element.className += ' pause';
        }
    }

    onResume() {
        if (-1 !== this.element.className.indexOf(' pause')) {
            this.element.className = this.element.className.replace(' pause', '');
        }
    }

    click() {
        if (this.onclick) {
            this.onclick();
        }
    }

    animate(state, text) {
        if (text) {
            this.title = text;
            this.animate('hide');
            this.update();
        }
        this.element.className = `animate animate-${state}`;
        return window.parseFloat(
            window.getComputedStyle(this.element).getPropertyValue('animation-duration')
        ) * 1000;
    }

    show(text) {
        return this.animate('show', text || this.title);
    }

    hide() {
        return this.animate('hide');
    }

    scroll(text) {
        return this.animate('scroll', text || this.title);
    }

    pass(text) {
        return this.animate('pass', text || this.title);
    }

}
