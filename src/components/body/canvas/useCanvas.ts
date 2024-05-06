import React, {MutableRefObject, useEffect, useRef} from "react";


const useCanvas = (draw: (context: CanvasRenderingContext2D) => void): MutableRefObject<HTMLCanvasElement | null> => {

    const canvasRef: React.RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (context) {
            draw(context);
        }
    }, [draw]);

    return canvasRef;
};

export default useCanvas;
