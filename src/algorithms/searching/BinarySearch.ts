import {SearchMove, SearchResult} from "../../api/SearchingApi";

export function getBinarySearchMoves(array: number[], value: number): SearchResult {
    const moves: SearchMove[] = [];
    const index: number = binarySearch(array, value, moves);
    return {index: index, moves: moves};
}

function binarySearch(array: number[], value: number, moves: SearchMove[]): number {
    let left: number = 0;
    let right: number = array.length - 1;
    while (left <= right) {
        let middle: number = Math.floor(left + (right - left) / 2);
        if (array[middle] === value) {
            moves.push({index: middle, isValue: true});
            return middle;
        }
        moves.push({index: middle, isValue: false});
        if (array[middle] < value) left = middle + 1;
        else right = middle - 1;
    }
    return -1;
}