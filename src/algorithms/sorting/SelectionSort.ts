import {SortingResult, SortMove} from "../../api/SortingApi";

export function getSelectionSortMoves(array: number[]): SortingResult {
    const moves: SortMove[] = [];
    selectionSort(array, moves);
    return {sortedArray: array, moves: moves};
}

function selectionSort(array: number[], moves: SortMove[]): void {
    for (let i = 0; i < array.length - 1; i++) {
        let min: number = i;
        for (let j = i + 1; j < array.length; j++) {
            moves.push({indices: [j, min], swap: false});
            if (array[j] < array[min]) {
                min = j;
            }
        }
        moves.push({indices: [i, min], swap: true});
        [array[i], array[min]] = [array[min], array[i]];
    }
}