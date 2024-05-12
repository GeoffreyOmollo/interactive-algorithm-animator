import {SortingResult, SortMove} from "../../api/SortingApi";

export function getInsertionSortMoves(array: number[]): SortingResult {
    const moves: SortMove[] = [];
    insertionSort(array, moves);
    return {sortedArray: array, moves: moves};
}

function insertionSort(array: number[], moves: SortMove[]): void {
    for (let i = 1; i < array.length; i++) {
        let temp: number = array[i];
        let index: number = i - 1;
        while (index >= 0 && array[index] > temp) {
            moves.push({indices: [index + 1, index], swap: true});
            array[index + 1] = array[index];
            index--;
        }
        array[index + 1] = temp;
    }
}