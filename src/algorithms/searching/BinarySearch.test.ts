import {generateRandomArrayWithoutDuplicates} from "../../utils/ArrayUtils";
import {getQuickSortMoves} from "../sorting/QuickSort";
import {getLinearSearchMoves} from "./LinearSearch";
import {getBinarySearchMoves} from "./BinarySearch";
import {SearchResult} from "../../api/SearchingApi";

test('it should find values with binary search correctly', () => {
    for (let i = 0; i < 1000; i++) {
        const array: number[] = generateRandomArrayWithoutDuplicates(Math.floor(Math.random() * 1000));
        getQuickSortMoves(array);
        const randomValue: number = array[Math.floor(Math.random() * array.length)];
        const result: SearchResult = getBinarySearchMoves(array, randomValue);
        expect(array[result.index]).toEqual(randomValue);
    }
});