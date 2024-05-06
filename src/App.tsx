import React, {useState} from 'react';
import Header from "./components/header/Header";
import {Box, ThemeProvider} from "@mui/material";
import {theme} from "./utils/MuiTheme";
import Footer from "./components/footer/Footer";
import Body from "./components/body/Body";


function App() {

    const [isShowSearchingAlgorithms, setIsShowSearchingAlgorithms] = useState<boolean>(true);
    const [isShowSortingAlgorithms, setIsShowSortingAlgorithms] = useState<boolean>(false);
    const [isShowSettings, setIsShowSettings] = useState<boolean>(false);

    return (
        <ThemeProvider theme={theme}>
            <Box
                minHeight={'100vh'}
                display={'flex'}
                flexDirection={'column'}>
                <Header
                    setIsShowSearchingAlgorithms={setIsShowSearchingAlgorithms}
                    setIsShowSortingAlgorithms={setIsShowSortingAlgorithms}
                    setIsShowSettings={setIsShowSettings}/>
                <Body
                    isShowSearchingAlgorithms={isShowSearchingAlgorithms}
                    isShowSortingAlgorithms={isShowSortingAlgorithms}
                    isShowSettings={isShowSettings}/>
                <Footer/>
            </Box>
        </ThemeProvider>
    );
}

export default App;
