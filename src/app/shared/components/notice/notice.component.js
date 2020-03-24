import { Component } from "babel-skeleton";

import { template } from "./notice.component.html";
import { Notice } from "../../models/notice.model";

export class NoticeComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "notice",
            template: template
        });
        this.notice = new Notice;
        this.element = null;
    }

    /**
     * @param {String} title
     */
    set title(title) {
        this.notice.title = title;
    }

    /**
     * @returns {String}
     */
    get title() {
        return this.notice.title;
    }

    /**
     * @param {String} background
     */
    set background(background) {
        this.notice.background = background;
    }

    /**
     * @fires
     */
    onInit() {
        this.title = this.notice.title || "Notice";
        this.background = null;
    }

    /**
     * 
     * @fires
     * @param {HTMLElement} element 
     */
    onUpdate(element) {
        this.element = element;
        if (this.notice.background) {
            this.element.style.backgroundImage = `url("dist/assets/images/${
                this.notice.background
                }")`;
        }
    }

    /**
      * @fires
      */
    onPause() {
        if (-1 === this.element.className.indexOf(" pause")) {
            this.element.className += " pause";
        }
    }

    /**
     * @fires
     */
    onResume() {
        if (-1 !== this.element.className.indexOf(" pause")) {
            this.element.className = this.element.className.replace(" pause", "");
        }
    }

    /**
     * @param {String} state
     * @return {Number}
     */
    animate(state, text) {
        if (text) {
            this.title = text;
            this.animate("hide");
            this.update();
        }
        this.element.className = `animate animate-${state}`;
        return window.parseFloat(
            window.getComputedStyle(this.element).getPropertyValue("animation-duration")
        ) * 1000;
    }

    /**
     * @param {String} text
     * @return {Number}
     */
    show(text) {
        return this.animate("show", text || this.title);
    }

    /**
     * @return {Number}
     */
    hide() {
        return this.animate("hide");
    }

    /**
     * @param {String} text
     * @return {Number}
     */
    scroll(text) {
        return this.animate("scroll", text || this.title);
    }

    /**
     * @param {String} text
     * @return {Number}
     */
    pass(text) {
        return this.animate("pass", text || this.title);
    }

}
