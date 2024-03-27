import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import { UserRatingsProvider } from './state/useUserRatings.tsx';
import { WorkQueueProvider } from './state/useWorkQueue.tsx';
import { MusicDataProvider } from './state/useMusicData.tsx';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#DA6A57',
    },
    secondary: {
      main: '#000',
    },
    background: {
      default: '#F6F1EA',
      paper: '#FFF',
    },
    text: {
      primary: '#000',
    },
    
  },
  typography: {
    fontFamily: '"Playfair Display", serif',
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 400,
    h1: {
      fontSize: 42,
    },
    h2: {
      fontSize: 36,
    },
    h3: {
      fontSize: 30,
    },
    h4: {
      fontSize: 24,
    },
    h5: {
      fontSize: 15,
      // fontFamily: '"Cormorant", serif',
      fontFamily: '"Nunito Sans", sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontSize: 14,
      // fontFamily: '"Cormorant", serif',
      fontFamily: '"Nunito Sans", sans-serif',
      fontWeight: 700,
    },
    body2: {
      fontSize: 14,
      fontFamily: '"Nunito Sans", sans-serif',
      // fontFamily: '"Cormorant", serif',
      // fontFamily: '"Source Serif 4", serif',
    },
    body1: {
      fontSize: 16,
      // fontFamily: '"Source Serif 4", serif',
      // fontFamily: '"Cormorant", serif',
      fontFamily: '"Nunito Sans", sans-serif',
    },
    button: {
      // fontSize: '0.9rem',
      // fontFamily: '"Baskerville", serif',
      fontFamily: '"Nunito Sans", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
};

const theme = createTheme(themeOptions);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <ThemeProvider theme={theme}>
      <MusicDataProvider>
        <UserRatingsProvider>
          <WorkQueueProvider>
            <App />
          </WorkQueueProvider>
        </UserRatingsProvider>
      </MusicDataProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
