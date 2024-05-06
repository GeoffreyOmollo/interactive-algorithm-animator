import {SortMove, SortingResult} from "../../api/SortingApi";

export function getBubbleSortMoves(array: number[]): SortingResult {
    const moves: SortMove[] = [];
    bubbleSort(array, moves);
    return {sortedArray: array, moves: moves};
}

function bubbleSort(array: number[], moves: SortMove[]): void {
    let swapped = false;
    let n = array.length;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                swapped = true;
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                moves.push({indices: [i, i + 1], swap: true});
            } else {
                moves.push({indices: [i, i + 1], swap: false});
            }
        }
        n = n - 1;
    } while (swapped);
}
