import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { ExplorationView } from './views/ExplorationView';
import icon from './assets/logo.svg';

function App() {
  return (
    <Box
      sx={{
        // backgroundColor: theme => theme.palette.background.default,
        // pb: 4,
        // width: '100%',
        // height: '100%',
        // position: 'absolute',
        // overflow: 'scroll',
      }}
    >
      {/* <AppBar
        position="static"
        sx={{
          boxShadow: '0 8px 16px #e2d8ce66;',
          mb: 2,
          backgroundColor: theme => theme.palette.background.default,
          color: theme => theme.palette.text.primary,
        }}
      >
        <Container maxWidth={false}>
          <Toolbar
            disableGutters
            sx={{ display: 'flex', alignItems: 'middle', justifyContent: 'space-between' }}
          >
            <Box />
            <Box display="flex" alignItems="center">
              <img
                src={icon}
                width={24}
                height={24}
                style={{ marginRight: 6 }}
              />
              <Typography
                variant="h4"
                fontSize={18}
                fontWeight={100}
              >
                Classical Fingerprint
              </Typography>
            </Box>
            <Button color="secondary">
              About
            </Button>
          </Toolbar>
        </Container>
      </AppBar> */}

      <ExplorationView />
    </Box>
  )
}

export default App
