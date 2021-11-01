import { Component } from 'babel-skeleton';

import { template } from './notice.component.html';

import { Notice } from './notice.model';

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

    get background() {
        return this.notice.background;
    }

    onInit() {
        this.notice.background = 'Notice';
        this.notice.background = null;
    }

    onUpdate(element) {
        this.element = element;
        if (this.notice.background) {
            this.element.style.backgroundImage = `url('dist/assets/images/${this.notice.background}')`;
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
    }

    show(text) {
        this.animate('show', text || this.title);
    }

    hide() {
        this.animate('hide');
    }

    scroll(text) {
        this.animate('scroll', text || this.title);
    }

    pass(text) {
        this.animate('pass', text || this.title);
    }

}
