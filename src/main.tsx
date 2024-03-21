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
      main: '#FFF',
    },
    background: {
      default: '#F6F1EA',
      paper: '#FFF',
    },
  },
  typography: {
    fontFamily: '"Oswald", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 400,
    h1: {
      fontFamily: '"Baskerville", "Helvetica", "Arial", sans-serif',
      fontSize: 42,
    },
    h2: {
      fontFamily: '"Baskerville", "Helvetica", "Arial", sans-serif',
      fontSize: 36,
    },
    h3: {
      fontFamily: '"Baskerville", "Helvetica", "Arial", sans-serif',
      fontSize: 30,
    },
    h4: {
      fontFamily: '"Baskerville", "Helvetica", "Arial", sans-serif',
      fontSize: 24,
    },
    h5: {
      fontFamily: '"Baskerville", "Helvetica", "Arial", sans-serif',
      fontSize: 18,
    },
    body2: {
      fontFamily: '"Baskerville"',
    },
    body1: {
      fontFamily: '"Baskerville", serif',
    },
    button: {
      // fontSize: '0.9rem',
      fontFamily: '"Baskerville", serif',
      fontWeight: 500,
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
