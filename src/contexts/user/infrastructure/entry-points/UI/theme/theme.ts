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
                    '&.Mui-disabled': {
                        '-webkit-text-fill-color': 'white', // Asegura que el texto deshabilitado también sea blanco
                        color: 'white',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    '&.Mui-disabled': {
                        '-webkit-text-fill-color': 'white', // Asegura que el texto deshabilitado también sea blanco
                        color: 'white',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .Mui-disable': {
                        '-webkit-text-fill-color': 'white', // Asegura que el texto deshabilitado también sea blanco
                        color: 'white',
                    },
                    '& .MuiInputBase-input': {
                        color: 'white',
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white',
                    },
                },
            },
        },
    },
});

export default theme;
