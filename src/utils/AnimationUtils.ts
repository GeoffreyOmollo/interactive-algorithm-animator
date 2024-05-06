export function getPositionRelativeToTimeFrame(currentLocation: number, targetLocation: number, timeFrame: number): number {
    return currentLocation + (targetLocation - currentLocation) * timeFrame;
}