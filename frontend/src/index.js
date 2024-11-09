import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider} from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';


const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#d32f2f',
        },
    },
});


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App />
        </ThemeProvider>
        );
