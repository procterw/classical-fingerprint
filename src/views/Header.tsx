import { AppBar, Box, Button, Container, Divider, Drawer, IconButton, Toolbar, Tooltip, Typography, styled } from "@mui/material";
import icon from '../assets/logo-text.svg';
import { WorkFilter } from "../components/WorkFilter";
import { useState } from "react";
import { GitHub } from "@mui/icons-material";

export const Header = () => {
  // const mq = useWidth();

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <>
      <AppBar
        // position="sticky"
        sx={{
          boxShadow: '0 8px 16px #c4b7aa22',
          backgroundColor: theme => theme.palette.background.default,
        }}
      >
        <Container maxWidth={false}>
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              alignItems: 'space-between',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box display="flex" alignItems="middle">
              <img
                src={icon}
                // width={24}
                height={30}
                style={{ marginRight: 8 }}
              />
            </Box>
            <WorkFilter />
            <Box>
              <IconButton
                href="https://github.com/procterw/classical-fingerprint"
                target="_blank"
                color="secondary"
              >
                <GitHub fontSize="small"/>
              </IconButton>
              <Button
                color="secondary"
                onClick={toggle}
              >
                About
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Offset sx={{ mb: 1 }} />
      <Drawer
        open={open}
        onClose={toggle}
        anchor="right"
      >
        <Box
          sx={{
            width: 400,
            padding: 2,
            minHeight: '100%',
            backgroundColor: theme => theme.palette.background.default,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >

          <Typography variant="h4">
            About Balade
          </Typography>
          <Typography variant="body1">
            <i>Balade</i> (French for "jaunt" or "stroll") is a website for learning about Western classical music via a <b>curated random walk</b>.
          </Typography>
          <Typography variant="body1">
            By listening to and rating samples of essential classical music, discover which composers, epochs, and genres match your taste, and build playlists of music you enjoy.
          </Typography>

          <Divider variant="middle"/>

          <Typography variant="body1">
            While you listen, learn basic classical terminology and history, such as...
          </Typography>
          <Box>
            <Tooltip title="A concerto is typically written for a solo instrument accompanied by an orchestra, whereas a symphony is a written for the entire orchestra">
              <Typography
                variant="body1"
                sx={{ background: '#d1c4e9',
                display: 'inline-block',
                px: 1,
                py: 0.3,
                mb: 2,
                cursor: 'pointer',
              }}>
                How is a concerto different than a symphony?
              </Typography>
            </Tooltip>
            <Tooltip title="Rachmanioff was born almost 200 years after Vivaldi">
              <Typography
                variant="body1"
                sx={{ background: '#bbdefb',
                display: 'inline-block',
                px: 1,
                py: 0.3,
                mb: 2,
                cursor: 'pointer',
              }}>
                How far apart did Rachmaninoff and Vivaldi live?
              </Typography>
            </Tooltip>
            <Tooltip title="These numbers indicate chronologically when the composer wrote the work, so op. 50 would be the composer's 50th work">
              <Typography
                variant="body1"
                sx={{ background: '#c8e6c9',
                display: 'inline-block',
                px: 1,
                py: 0.3,
                mb: 2,
                cursor: 'pointer',
              }}>
                What do the numbers at the end of titles mean?
              </Typography>
            </Tooltip>
          </Box>

          <Divider variant="middle"/>

            <Typography variant="body1">
              I don't know that much about classical music, so if <i>you</i> do and have corrections or suggestions contact me on GitHub!
            </Typography>

            <Box>
              <IconButton
                href=" https://github.com/procterw"
                target="_blank"
                color="secondary"
              >
                <GitHub />
              </IconButton>
            </Box>
        </Box>
      </Drawer>
    </>
  );
};
