import Container from '@mui/material/Container';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { ExplorationView } from './views/ExplorationView';

function App() {
  return (
    <Box
      sx={{
        backgroundColor: theme => theme.palette.background.default,
        pb: 4,
      }}
    >
      <AppBar
        position="static"
        sx={{
          boxShadow: 'none',
          mb: 4,
          backgroundColor: theme => theme.palette.background.default,
          color: theme => theme.palette.text.primary,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* <img src={iconUrl} style={{ width: 30, }} /> */}
            <Typography
              variant="h4"
            >
              Classical Fingerprint
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <ExplorationView />
    </Box>
  )
}

export default App
