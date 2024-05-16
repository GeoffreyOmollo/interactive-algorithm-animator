import {SearchMove, SearchResult} from "../../api/SearchingApi";

export function getLinearSearchMoves(array: number[], value: number): SearchResult {
    const moves: SearchMove[] = [];
    const index: number = linearSearch(array, value, moves);
    return {index: index, moves: moves};
}

function linearSearch(array: number[], value: number, moves: SearchMove[]): number {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == value) {
            moves.push({index: i, isValue: true});
            return i;
        }
        moves.push({index: i, isValue: false});
    }
    return -1;
}
