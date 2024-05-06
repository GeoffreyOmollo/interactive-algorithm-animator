export function generateRandomArrayWithoutDuplicates(arraySize: number): number[] {
    const newArray: number[] = [];
    while (newArray.length < arraySize) {
        const random: number = Math.random();
        if (!newArray.includes(random)) {
            newArray.push(Math.random());
        }
    }
    return newArray;
}
