export interface SearchMove {
    index: number;
    isValue: boolean;
}

export interface SearchResult {
    index: number;
    moves: SearchMove[];
}

export interface SearchQueueItem {
    x: number;
    y: number;
    isValue: boolean;
}