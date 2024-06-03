import {generateRandomArrayWithoutDuplicates} from "../../utils/ArrayUtils";
import {getMergeSortMoves} from "./MergeSort";
import {SortingResult} from "../../api/SortingApi";

test('it should sort arrays correctly with merge sort', () => {
    for (let i = 0; i < 1000; i++) {
        const array: number[] = generateRandomArrayWithoutDuplicates(Math.floor(Math.random() * 1000));
        let expected: number[] = [...array];
        expected = expected.sort((a: number, b: number) => a - b);
        const result: SortingResult = getMergeSortMoves(array);
        expect(result.sortedArray).toEqual(expected);
    }
});
