import {generateRandomArrayWithoutDuplicates} from "../../utils/ArrayUtils";
import {getQuickSortMoves} from "../sorting/QuickSort";
import {SearchResult} from "../../api/SearchingApi";
import {getBinarySearchMoves} from "./BinarySearch";
import {getInterpolationSearchMoves} from "./InterpolationSearch";

test('it should find values with interpolation search correctly', () => {
    for (let i = 0; i < 1000; i++) {
        const array: number[] = generateRandomArrayWithoutDuplicates(Math.floor(Math.random() * 1000));
        getQuickSortMoves(array);
        const randomValue: number = array[Math.floor(Math.random() * array.length)];
        const result: SearchResult = getInterpolationSearchMoves(array, randomValue);
        if (array[result.index] !== randomValue) {
            console.log("Test");
        }
        expect(array[result.index]).toEqual(randomValue);
    }
});