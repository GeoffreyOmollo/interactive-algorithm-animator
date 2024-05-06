import React from "react";
import {Box, Slider, Typography} from "@mui/material";


interface SettingsProps {
    arraySize: number;
    setArraySize: React.Dispatch<React.SetStateAction<number>>;
    frameCount: number;
    setFrameCount: React.Dispatch<React.SetStateAction<number>>;
}

const Settings = (props: SettingsProps) => {

    const onChangeArraySize = (event: Event, newValue: number | number[]) => {
        props.setArraySize(newValue as number);
    }

    const onChangeFrameCount = (event: Event, newValue: number | number[]) => {
        props.setFrameCount(newValue as number);
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            width='100%'
            my={10}>
            <Box
                width='75%'
                display='flex'
                justifyContent='space-between'
                sx={{flexDirection: {xs: 'column', md: 'row'}}}>
                <Box sx={{width: {xs: '100%', md: '45%'}, mb: {xs: 5, md: 'none'}}}>
                    <Typography>Array Size</Typography>
                    <Slider
                        value={props.arraySize}
                        onChange={onChangeArraySize}
                        step={1}
                        min={5}
                        max={50}
                        valueLabelDisplay='auto'/>
                </Box>
                <Box sx={{width: {xs: '100%', md: '45%'}}}>
                    <Typography>Frames Per Animation</Typography>
                    <Slider
                        value={props.frameCount}
                        onChange={onChangeFrameCount}
                        step={1}
                        min={1}
                        max={50}
                        valueLabelDisplay='auto'/>
                </Box>
            </Box>
        </Box>
    );
};

export default Settings;
