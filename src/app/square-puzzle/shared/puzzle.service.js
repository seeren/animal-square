import { Service } from 'babel-skeleton';

export const PuzzleService = new class extends Service {

    /**
     * @param {HTMLElement}
     * @returns {Number}
     */
    duration(cel) {
        return window.parseFloat(
            window.getComputedStyle(cel).getPropertyValue("transition-duration"),
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
