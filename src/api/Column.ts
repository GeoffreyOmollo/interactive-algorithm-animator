import {getPositionRelativeToTimeFrame} from "../utils/AnimationUtils";
import {SortQueueItem} from "./SortingApi";
import {SearchQueueItem} from "./SearchingApi";

export class Column {

    public x: number;
    public y: number;
    private readonly width: number;
    private readonly height: number;
    private readonly sortQueue: SortQueueItem[];
    private readonly searchQueue: SearchQueueItem[];
    private readonly isSearchValue: boolean;

    constructor(x: number, y: number, width: number, height: number, isSearchValue: boolean) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sortQueue = [];
        this.searchQueue = [];
        this.isSearchValue = isSearchValue;
    };

    jumpSearch(isValue: boolean, frameCount: number) {
        for (let i = 1; i <= frameCount; i++) {
            const t = i / frameCount;
            const u = Math.sin(t * Math.PI);
            this.searchQueue.push({
                x: this.x,
                y: this.y - u * this.width,
                isValue: isValue,
            })
        }
    }

    jumpSort(frameCount: number) {
        for (let i = 1; i <= frameCount; i++) {
            const t = i / frameCount;
            const u = Math.sin(t * Math.PI);
            this.sortQueue.push({
                x: this.x,
                y: this.y - u * this.width,
                swap: false,
            })
        }
    }

    moveToSort(location: { x: number, y: number }, yOffSet: number, frameCount: number) {
        for (let i = 1; i <= frameCount; i++) {
            const t = i / frameCount;
            const u = Math.sin(t * Math.PI);
            this.sortQueue.push({
                x: getPositionRelativeToTimeFrame(this.x, location.x, t),
                y: getPositionRelativeToTimeFrame(this.y, location.y, t) + u * this.width / 2 * yOffSet,
                swap: true,
            });
        }
    }

    draw(context: CanvasRenderingContext2D): boolean {

        let changed: boolean = false;
        let colour: string = this.isSearchValue ? "rgb(230, 230, 25)" : "rgb(150, 150, 150)";

        if (this.sortQueue.length > 0) {
            const queueItem: SortQueueItem | undefined = this.sortQueue.shift();
            if (queueItem) {
                this.x = queueItem.x;
                this.y = queueItem.y;
                colour = queueItem.swap ? "rgb(184, 20, 20)" : "rgb(76, 145, 65)";
                changed = true;
            }
        }

        if (this.searchQueue.length > 0) {
            const searchQueueItem: SearchQueueItem | undefined = this.searchQueue.shift();
            if (searchQueueItem) {
                this.x = searchQueueItem.x;
                this.y = searchQueueItem.y;
                colour = searchQueueItem.isValue ? "rgb(76, 145, 65)" : "rgb(184, 20, 20)";
                changed = true;
            }
        }

        const left = this.x - this.width / 2;
        const top = this.y - this.height;
        const right = this.x + this.width / 2;

        context.beginPath();
        context.fillStyle = colour;
        context.moveTo(left, top);
        context.lineTo(left, this.y);
        context.ellipse(this.x, this.y, this.width / 2, this.width / 4, 0, Math.PI,
            Math.PI * 2, true);
        context.lineTo(right, top);
        context.ellipse(this.x, top, this.width / 2, this.width / 4, 0, 0,
            Math.PI * 2, true);
        context.fill();
        context.stroke();

        return changed;
    }

}
