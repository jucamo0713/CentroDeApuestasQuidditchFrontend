import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    color: 'white',
                },
                underline: {
                    '&:after': {
                        borderBottomColor: 'white',
                    },
                    '&:before': {
                        borderBottomColor: 'white',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'white',
                },
            },
        },
    },
});

export default theme;
