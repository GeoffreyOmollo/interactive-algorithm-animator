import {generateRandomArrayWithoutDuplicates} from "../../utils/ArrayUtils";
import {getQuickSortMoves} from "./QuickSort";
import {SortingResult} from "../../api/SortingApi";

test('It should sort arrays correctly with quick sort', () => {
    for (let i = 0; i < 1000; i++) {
        const array: number[] = generateRandomArrayWithoutDuplicates(Math.floor(Math.random() * 1000));
        let expected: number[] = [...array];
        expected = expected.sort((a: number, b: number) => a - b);
        const result: SortingResult = getQuickSortMoves(array);
        expect(result.sortedArray).toEqual(expected);
    }
});
