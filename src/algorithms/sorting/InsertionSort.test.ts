import {generateRandomArrayWithoutDuplicates} from "../../utils/ArrayUtils";
import {SortingResult} from "../../api/SortingApi";
import {getInsertionSortMoves} from "./InsertionSort";

test('it should sort arrays correctly with insertion sort', () => {
    for (let i = 0; i < 1000; i++) {
        const array: number[] = generateRandomArrayWithoutDuplicates(Math.floor(Math.random() * 1000));
        let expected: number[] = [...array];
        expected = expected.sort((a: number, b: number) => a - b);
        const result: SortingResult = getInsertionSortMoves(array);
        expect(result.sortedArray).toEqual(expected);
    }
});
