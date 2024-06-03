import {SortMove, SortingResult} from "../../api/SortingApi";

export function getMergeSortMoves(array: number[]): SortingResult {

    const moves: SortMove[] = [];

    if (array.length <= 1) {
        return {sortedArray: array, moves: moves};
    }

    const elementToIndexMap = new Map();
    array.forEach((element, index) => elementToIndexMap.set(element, index));
    const sortedArray: number[] = mergeSort(array, elementToIndexMap, moves);

    return {sortedArray: sortedArray, moves: moves};
}

function mergeSort(array: number[], elementToIndexMap: Map<number, number>, moves: SortMove[]): number[] {

    if (array.length === 1) {
        return array;
    }

    // Split array in half and do merge sort for each half
    const middleIndex = Math.floor(array.length / 2);
    const firstHalf: number[] = mergeSort(array.slice(0, middleIndex), elementToIndexMap, moves);
    const secondHalf: number[] = mergeSort(array.slice(middleIndex), elementToIndexMap, moves);

    const sortedArray: number[] = [];
    let i: number = 0;
    let j: number = 0;
    while (i < firstHalf.length && j < secondHalf.length) {
        // Add current element from first half if it's lower than current element of second half, else add current
        // element from second half
        if (firstHalf[i] < secondHalf[j]) {
            moves.push({
                indices: [elementToIndexMap.get(firstHalf[i]) ?? 0,
                    elementToIndexMap.get(secondHalf[j]) ?? 0], swap: false
            });
            sortedArray.push(firstHalf[i++]);
        } else {
            // Create move for every item that is behind the current element of first half
            const elementFromSecondHalf: number = secondHalf[j];
            for (let k: number = firstHalf.length - 1; k >= i; k--) {
                const currentElementOfFirstHalf: number = firstHalf[k];
                moves.push({
                    indices: [elementToIndexMap.get(currentElementOfFirstHalf) ?? 0,
                        elementToIndexMap.get(elementFromSecondHalf) ?? 0], swap: true
                });
                const indexOfSwapItem = elementToIndexMap.get(elementFromSecondHalf) ?? 0;
                const indexOfSwap = elementToIndexMap.get(currentElementOfFirstHalf) ?? 0;
                elementToIndexMap.set(elementFromSecondHalf, indexOfSwap);
                elementToIndexMap.set(currentElementOfFirstHalf, indexOfSwapItem);
            }
            sortedArray.push(secondHalf[j++]);
        }
    }

    // Add remaining elements of first half
    while (i < firstHalf.length) {
        sortedArray.push(firstHalf[i++]);
    }

    // Add remaining elements of second half
    while (j < secondHalf.length) {
        sortedArray.push(secondHalf[j++]);
    }

    return sortedArray;
}
