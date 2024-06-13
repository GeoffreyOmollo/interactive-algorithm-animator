import {SortMove, SortingResult} from "../../api/SortingApi";

export function getQuickSortMoves(array: number[]): SortingResult {
    const moves: SortMove[] = [];
    quickSort(array, 0, array.length - 1, moves);
    return {sortedArray: array, moves: moves};
}

function quickSort(array: number[], low: number, high: number, moves: SortMove[]): void {

    // Check if indices are valid
    if (low >= high || low < 0) {
        return;
    }

    // Partition array and get pivot
    const pivot: number = partition(array, low, high, moves);

    // Sort the two partitions
    quickSort(array, low, pivot - 1, moves);
    quickSort(array, pivot + 1, high, moves);
}

function partition(array: number[], low: number, high: number, moves: SortMove[]): number {

    // Set last element as pivot
    const pivot = array[high];

    // Temporary pivot index
    let i = low - 1;

    for (let j = low; j < high; j++) {
        // If element is <= pivot move temporary pivot forward and swap element with temporary pivot element
        if (array[j] <= pivot) {
            i++;
            if (i !== j) {
                [array[i], array[j]] = [array[j], array[i]];
                moves.push({indices: [i, j], swap: true});
            }
        } else {
            moves.push({indices: [j, high], swap: false});
        }
    }

    // Move last pivot element to the correct pivot position
    i++;
    [array[i], array[high]] = [array[high], array[i]];
    moves.push({indices: [i, high], swap: true});

    return i;
}
