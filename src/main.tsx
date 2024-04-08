import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import { UserRatingsProvider } from './state/useUserRatings.tsx';
import { WorkQueueProvider } from './state/useWorkQueue.tsx';
import { MusicDataProvider } from './state/useMusicData.tsx';
import './global.d.ts';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#DA6A57',
    },
    secondary: {
      main: '#444',
    },
    background: {
      default: '#F6F1EA',
      paper: '#fffcf7',
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
      fontSize: 30,
    },
    h2: {
      fontSize: 24,
    },
    h3: {
      fontSize: 21,
    },
    h4: {
      fontSize: 18,
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
      fontSize: 13,
      fontFamily: '"Nunito Sans", sans-serif',
      // fontFamily: '"Cormorant", serif',
      // fontFamily: '"Source Serif 4", serif',
    },
    body1: {
      fontSize: 14,
      // fontFamily: '"Source Serif 4", serif',
      // fontFamily: '"Cormorant", serif',
      fontFamily: '"Nunito Sans", sans-serif',
    },
    button: {
      fontSize: '0.9rem',
      // fontFamily: '"Baskerville", serif',
      // fontFamily: '"Nunito Sans", sans-serif',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
        },
      }, 
    }, 
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          boxShadow: '0 4px 8px #e2d8ce66;',
        },
      }, 
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
