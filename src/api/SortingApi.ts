export interface SortMove {
    indices: number[];
    swap: boolean;
}

export interface SortingResult {
    sortedArray: number[];
    moves: SortMove[];
}

export interface SortQueueItem {
    x: number;
    y: number;
    swap: boolean;
}
