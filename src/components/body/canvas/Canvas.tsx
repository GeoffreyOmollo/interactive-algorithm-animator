import {MutableRefObject} from "react";
import useCanvas from "./useCanvas";


export interface CanvasProps {
    draw: (context: CanvasRenderingContext2D) => void;
}

export function resizeCanvasToContainerSize(canvas: HTMLCanvasElement): void {
    const canvasContainer: HTMLElement | null = document.getElementById("canvasContainer");
    if (canvasContainer) {
        const width: number = canvasContainer.offsetWidth;
        const height: number = 2 / 3 * width;
        canvas.width = width;
        canvas.height = height;
    }
}

const Canvas = (props: CanvasProps) => {

    const {draw, ...rest} = props;
    const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useCanvas(props.draw);

    return <canvas ref={canvasRef} {...rest} />
}

export default Canvas;
