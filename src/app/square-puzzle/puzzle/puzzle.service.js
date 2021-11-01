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
                if ((index % 4) * width !== left - shapeParent.left
                    || window.parseInt(index / 4) * width !== top - shapeParent.top) {
                    throw element;
                }
            });
        } catch (element) {
            return false;
        }
        return true;
    }

}
