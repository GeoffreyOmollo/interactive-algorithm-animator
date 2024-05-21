import {SearchMove, SearchResult} from "../../api/SearchingApi";

export function getInterpolationSearchMoves(array: number[], value: number): SearchResult {
    const moves: SearchMove[] = [];
    const index: number = interpolationSearch(array, value, moves);
    return {index: index, moves: moves};
}

function interpolationSearch(array: number[], value: number, moves: SearchMove[]): number {
    let left: number = 0;
    let right: number = array.length - 1;
    while (value >= array[left] && value <= array[right] && left <= right) {
        let guess: number = left + Math.round(((right - left) / (array[right] - array[left])) * (value - array[left]));
        if (array[guess] === value) {
            moves.push({index: guess, isValue: true});
            return guess;
        }
        moves.push({index: guess, isValue: false});
        if (array[guess] < value) left = guess + 1;
        else right = guess - 1;
    }
    return -1;
}