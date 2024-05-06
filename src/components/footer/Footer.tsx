import {Box, IconButton, Stack, Typography} from "@mui/material";
import {GitHub, LinkedIn, Mail} from "@mui/icons-material";


const Footer = () => {
    return (
        <Box
            component='footer'
            width='100%'
            sx={{backgroundColor: '#e8e4db'}}
            mt={2}
            display='flex'
            flexDirection='column'
            alignItems='center'
            p={2}>
            <Typography>
                Interactive Algorithm Animator
            </Typography>
            <Stack direction='row'>
                <IconButton href={'mailto:nicolas.justen95@gmail.com'}>
                    <Mail fontSize='large'/>
                </IconButton>
                <IconButton href={'https://de.linkedin.com/in/nicolas-justen-232324178'}>
                    <LinkedIn fontSize='large'/>
                </IconButton>
                <IconButton href={'https://github.com/nicolasjusten95'}>
                    <GitHub fontSize='large'/>
                </IconButton>
            </Stack>
        </Box>
    );
};

export default Footer;
