import { Component } from "babel-skeleton";

import { template } from "./notice.component.html";
import { Notice } from "../../models/notice.model";

/**
 * @type {Number}
 */
let instance = 0;

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
        instance++;
    }

    /**
     * @returns {Number}
     */
    getInstance() {
        return instance;
    }

    /**
     * @param {String} title
     */
    set title(title) {
        this.notice.title = title;
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
        this.notice.title = this.notice.title || "Notice";
        this.notice.background = this.notice.background || null;
    }

    /**
     * 
     * @fires
     * @param {HTMLElement} element 
     */
    onUpdate(element) {
        if (this.notice.background) {
            element.style.backgroundImage = `url("dist/assets/images/${this.notice.background}")`;
        }
    }

    /**
     * @return {Number}
     */
    show() {
        return this.animate("hide", "show");
    }

    /**
     * @return {Number}
     */
    hide() {
        return this.animate("show", "hide");
    }

    /**
     * @param {String} actual
     * @param {String} next
     * @return {Number}
     */
    animate(actual, next) {
        const element = window.document.querySelector(`${this.selector}`);
        const duration = parseFloat(window.getComputedStyle(element)
            .getPropertyValue("animation-duration")) * 1000;
        element.className = element.className.replace(` animate-${actual}`, "") + ` animate-${next}`;
        return duration;
    }

}
