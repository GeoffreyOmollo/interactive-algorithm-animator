import SortingAlgorithms from "./sortingAlgorithms/SortingAlgorithms";
import React, {useState} from "react";
import {Box} from "@mui/material";
import Settings from "./settings/Settings";
import SearchingAlgorithms from "./searchingAlgorithms/SearchingAlgorithms";


interface BodyProps {
    isShowSearchingAlgorithms: boolean;
    isShowSortingAlgorithms: boolean;
    isShowSettings: boolean;
}

const Body = (props: BodyProps) => {

    const [arraySize, setArraySize] = useState<number>(20);
    const [frameCount, setFrameCount] = useState<number>(20);

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            flexGrow={1}>
            {props.isShowSearchingAlgorithms && <SearchingAlgorithms
                arraySize={arraySize}
                frameCount={frameCount}/>}
            {props.isShowSortingAlgorithms && <SortingAlgorithms
                arraySize={arraySize}
                frameCount={frameCount}/>}
            {props.isShowSettings && <Settings
                arraySize={arraySize}
                setArraySize={setArraySize}
                frameCount={frameCount}
                setFrameCount={setFrameCount}/>}
        </Box>
    );
};

export default Body;
