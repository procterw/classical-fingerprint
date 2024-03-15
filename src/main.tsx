import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#207fd4',
    },
    secondary: {
      main: '#ffcc80',
    },
  },
  typography: {
    fontFamily: '"Oswald", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 400,
    h1: {
      fontFamily: '"Baskerville", "Helvetica", "Arial", sans-serif',
    },
    h2: {
      fontFamily: '"Baskerville", "Helvetica", "Arial", sans-serif',
    },
    h3: {
      fontFamily: '"Baskerville", "Helvetica", "Arial", sans-serif',
    },
    h4: {
      fontFamily: '"Baskerville", "Helvetica", "Arial", sans-serif',
    },
    h5: {
      fontFamily: '"Baskerville", "Helvetica", "Arial", sans-serif',
    },
    body2: {
      fontFamily: '"Baskerville", serif',
    },
    body1: {
      fontFamily: '"Oswald", "Helvetica", "Arial", sans-serif',
    },
    button: {
      fontSize: '0.9rem',
      fontWeight: 700,
    },
  },
};

const theme = createTheme(themeOptions);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
