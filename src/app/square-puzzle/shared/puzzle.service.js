import { Service } from 'babel-skeleton';

export const PuzzleService = new class extends Service {

    /**
     * @returns {Number}
     */
    duration() {
        return window.parseFloat(
            window.getComputedStyle(
                window.document.querySelector(`puzzle .cel`)
            ).getPropertyValue("transition-duration"),
            10
        );
    }

    /**
     * @param {HTMLElement}
     * @returns {Number}
     */
    number(cel) {
        return window.parseInt(cel.className.substring(8, 10), 10);
    }

    /**
     * @returns {Boolean}
     */
    complete() {
        try {
            const width = window.document.querySelector(`puzzle .cel`).offsetWidth;
            window.document.querySelectorAll(`puzzle .cel`).forEach((element, index) => {
                const offsetTop = width * window.parseInt(index / 4);
                const offsetLeft = width * (index % 4);
                if (element.offsetTop !== offsetTop
                    && (element.offsetTop > offsetTop + 5
                        || element.offsetTop < offsetTop - 5)) {
                    throw element;
                }
                if (element.offsetLeft !== offsetLeft
                    && (element.offsetLeft > offsetLeft + 5
                        || element.offsetLeft < offsetLeft - 5)) {
                    throw element;
                }
            });
        } catch (element) {
            return false;
        }
        return true;
    }


}
