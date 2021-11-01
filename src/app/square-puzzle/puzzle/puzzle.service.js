import { Service } from 'babel-skeleton';

export const PuzzleService = new class extends Service {

    getCellNumber(cell) {
        return window.parseInt(cell.className.substring(8, 10), 10);
    }

    isComplete() {
        try {
            const shapeParent = window.document.querySelector('puzzle').getBoundingClientRect();
            window.document.querySelectorAll('puzzle .cel').forEach((element, index) => {
                const { width, left, top } = element.getBoundingClientRect();
                const offsetTop = window.parseInt(index / 4) * width;
                const offsetLeft = (index % 4) * width;
                if (Math.abs(offsetLeft - Math.round(left - shapeParent.left)) > 5
                    || Math.abs(offsetTop - Math.round(top - shapeParent.top)) > 5) {
                    throw element;
                }
            });
        } catch (element) {
            return false;
        }
        return true;
    }

}
