import Canvas, {resizeCanvasToContainerSize} from "../canvas/Canvas";
import {SortingResult, SortMove} from "../../../api/SortingApi";
import {Column} from "../../../api/Column";
import {getMergeSortMoves} from "../../../algorithms/sorting/MergeSort";
import {getQuickSortMoves} from "../../../algorithms/sorting/QuickSort";
import {getBubbleSortMoves} from "../../../algorithms/sorting/BubbleSort";
import {generateRandomArrayWithoutDuplicates} from "../../../utils/ArrayUtils";
import {Fragment, useEffect, useState} from "react";
import {Box, Button, ButtonGroup} from "@mui/material";
import {
    CANVAS_MARGIN_FACTOR_HIGH_SIZES,
    CANVAS_MARGIN_FACTOR_LOW_SIZES,
    DIAGONAL_FACTOR_HIGH_SIZES,
    DIAGONAL_FACTOR_LOW_SIZES,
    MARGIN_BETWEEN_ELEMENTS,
    MAX_RELATIVE_HEIGHT_HIGH_SIZES,
    MAX_RELATIVE_HEIGHT_LOW_SIZES
} from "../../../api/Constants";
import {Settings} from "../../../api/SettingsApi";
import {getSelectionSortMoves} from "../../../algorithms/sorting/SelectionSort";
import {getInsertionSortMoves} from "../../../algorithms/sorting/InsertionSort";
import {ButtonApi} from "../../../api/ButtonApi";


const SortingAlgorithms = (props: Settings) => {

    const [array, setArray] = useState<number[]>([]);
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);

    const columns: Column[] = [];
    let moves: SortMove[] = [];

    useEffect(() => {
        resetArray();
        // Re-render component if screensize changes to adjust canvas
        window.addEventListener('resize', onGenerateNewArray);
        return () => {
            window.removeEventListener('resize', onGenerateNewArray);
        }
    }, []);

    const resetArray = (): void => {
        const newArray: number[] = generateRandomArrayWithoutDuplicates(props.arraySize);
        setArray(newArray);
    }

    function onGenerateNewArray() {
        resetArray();
    }

    function onSelectionSort() {
        if (moves.length > 0) return;
        const result: SortingResult = getSelectionSortMoves(array);
        moves = result.moves;
    }

    function onInsertionSort() {
        if (moves.length > 0) return;
        const result: SortingResult = getInsertionSortMoves(array);
        moves = result.moves;
    }


    function onBubbleSort() {
        if (moves.length > 0) return;
        const result: SortingResult = getBubbleSortMoves(array);
        moves = result.moves;
    }

    function onQuickSort() {
        if (moves.length > 0) return;
        const result: SortingResult = getQuickSortMoves(array);
        moves = result.moves;
    }

    function onMergeSort() {
        if (moves.length > 0) return;
        const result: SortingResult = getMergeSortMoves(array);
        moves = result.moves;
    }

    const draw = (context: CanvasRenderingContext2D): void => {
        setCanvasContext(context);
        if (!canvasContext) {
            return;
        }
        resizeCanvasToContainerSize(canvasContext.canvas);
        const diagonalFactor: number = array.length > 20 ? DIAGONAL_FACTOR_HIGH_SIZES : DIAGONAL_FACTOR_LOW_SIZES;
        const canvasMarginFactor: number = array.length > 8 ? CANVAS_MARGIN_FACTOR_HIGH_SIZES : CANVAS_MARGIN_FACTOR_LOW_SIZES;
        const canvasMargin: number = canvasContext.canvas.height * canvasMarginFactor * 0.5;
        const maxRelativeHeight: number = array.length > 8 ? MAX_RELATIVE_HEIGHT_HIGH_SIZES : MAX_RELATIVE_HEIGHT_LOW_SIZES;
        const spacing: number = (canvasContext.canvas.width - canvasMargin * 2) / array.length;
        for (let i = 0; i < array.length; i++) {
            const x: number = i * spacing + spacing / 2 + canvasMargin;
            const y: number = canvasContext.canvas.height - canvasMargin - i * diagonalFactor;
            const width: number = spacing - MARGIN_BETWEEN_ELEMENTS;
            const height: number = canvasContext.canvas.height * maxRelativeHeight * array[i];
            columns[i] = new Column(x, y, width, height, false);
        }
        animate();
    }

    function animate() {
        if (!canvasContext) {
            return;
        }
        canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
        let changed = false;
        for (const col of columns) {
            changed = col.draw(canvasContext) || changed;
        }
        if (!changed && moves.length > 0) {
            const move: SortMove | undefined = moves.shift();
            if (move) {
                const [i, j] = move.indices;
                if (move.swap) {
                    columns[i].moveToSort(columns[j], 1, props.frameCount);
                    columns[j].moveToSort(columns[i], -1, props.frameCount);
                    [columns[i], columns[j]] = [columns[j], columns[i]];
                } else {
                    columns[i].jumpSort(props.frameCount);
                    columns[j].jumpSort(props.frameCount);
                }
            }
        }
        requestAnimationFrame(animate);
    }

    const buttons: ButtonApi[] = [
        {key: 1, onClick: onGenerateNewArray, text: 'Generate new array'},
        {key: 2, onClick: onSelectionSort, text: 'Selection Sort'},
        {key: 3, onClick: onInsertionSort, text: 'Insertion Sort'},
        {key: 4, onClick: onBubbleSort, text: 'Bubble Sort'},
        {key: 5, onClick: onMergeSort, text: 'Merge Sort'},
        {key: 6, onClick: onQuickSort, text: 'Quick Sort'},
    ];

    return (
        <Fragment>
            <Box
                width='50%'
                minWidth='350px'
                m={2}
                id='canvasContainer'>
                <Canvas draw={draw}/>
            </Box>
            {/*For some reason orientation is not working with breakpoint*/}
            <ButtonGroup
                variant='contained'
                orientation='horizontal'
                sx={{display: {xs: "none", md: "flex"}, m: 2}}>
                {buttons.map(i => <Button key={i.key} onClick={i.onClick}>{i.text}</Button>)}
            </ButtonGroup>
            <ButtonGroup
                variant='contained'
                orientation='vertical'
                sx={{display: {xs: "flex", md: "none"}, m: 2}}>
                {buttons.map(i => <Button key={i.key} onClick={i.onClick}>{i.text}</Button>)}
            </ButtonGroup>
        </Fragment>
    );
};

export default SortingAlgorithms;
