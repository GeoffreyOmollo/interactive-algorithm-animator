import {
    AppBar,
    Box,
    Button,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';
import MenuIcon from '@mui/icons-material/Menu';
import React, {MouseEvent, useState} from "react";
import {Page} from "../../api/NavBarApi";
import SortIcon from '@mui/icons-material/Sort';
import {Settings} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';


interface HeaderProps {
    setIsShowSearchingAlgorithms: React.Dispatch<React.SetStateAction<boolean>>;
    setIsShowSortingAlgorithms: React.Dispatch<React.SetStateAction<boolean>>;
    setIsShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = (props: HeaderProps) => {

    const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);

    const onOpenMenu = (event: MouseEvent<HTMLElement>): void => {
        setAnchorNav(event.currentTarget);
    };

    const onCloseMenu = (): void => {
        setAnchorNav(null);
    };

    const onSearchingAlgorithms = (): void => {
        props.setIsShowSearchingAlgorithms(true);
        props.setIsShowSortingAlgorithms(false);
        props.setIsShowSettings(false);
        onCloseMenu();
    }

    const onSortingAlgorithms = (): void => {
        props.setIsShowSearchingAlgorithms(false);
        props.setIsShowSortingAlgorithms(true);
        props.setIsShowSettings(false);
        onCloseMenu();
    }

    const onSettings = (): void => {
        props.setIsShowSearchingAlgorithms(false);
        props.setIsShowSortingAlgorithms(false);
        props.setIsShowSettings(true);
        onCloseMenu();
    }

    const title: string = 'Interactive Algorithm Animator';
    const icon: React.ReactElement = <BarChartIcon/>;
    const pages: Page [] = [
        {name: 'Searching Algorithms', icon: <SearchIcon/>, onClick: onSearchingAlgorithms, key: 1},
        {name: 'Sorting Algorithms', icon: <SortIcon/>, onClick: onSortingAlgorithms, key: 2},
        {name: 'Settings', icon: <Settings/>, onClick: onSettings, key: 3}
    ];

    const getButtonFromPage = (page: Page): React.ReactElement => {
        return <Button
            key={page.key}
            startIcon={page.icon}
            onClick={page.onClick}
            color='inherit'>
            <Typography>{page.name}</Typography>
        </Button>;
    };

    const getMenuItemFromPage = (page: Page): React.ReactElement => {
        return <MenuItem
            key={page.key}
            onClick={page.onClick}>
            <ListItemIcon>{page.icon}</ListItemIcon>
            <ListItemText>
                <Typography>{page.name}</Typography>
            </ListItemText>
        </MenuItem>
    };

    return (
        <AppBar
            position='static'
            sx={{mb: 2}}>
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='logo'
                    onClick={onSearchingAlgorithms}>
                    {icon}
                </IconButton>
                <Typography
                    variant='h6'
                    component='div'
                    sx={{flexGrow: 1}}>
                    {title}
                </Typography>
                {/*Desktop*/}
                <Stack
                    sx={{display: {xs: 'none', md: 'flex'}}}
                    direction='row'
                    spacing={2}>
                    {pages.map((page) => getButtonFromPage(page))}
                </Stack>
                {/*Mobile*/}
                <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        onClick={onOpenMenu}>
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        open={Boolean(anchorNav)}
                        onClose={onCloseMenu}
                        anchorEl={anchorNav}
                        sx={{display: {xs: 'flex', md: 'none'}}}>
                        <MenuList>
                            {pages.map((page) => getMenuItemFromPage(page))}
                        </MenuList>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
