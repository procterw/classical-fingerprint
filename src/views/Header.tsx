import { AppBar, Box, Button, Container, Drawer, Toolbar, Typography, styled } from "@mui/material";
import icon from '../assets/logo.svg';
// import { useWidth } from "../state/useWidth";
import { WorkFilter } from "../components/WorkFilter";
import { useState } from "react";

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
          boxShadow: '0 8px 16px #e2d8ce33',
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
                width={24}
                height={24}
                style={{ marginRight: 8 }}
              />
              <Typography
                variant="h4"
                fontSize={18}
                fontWeight={300}
                color="black"
              >
                Classical Walk
              </Typography>
            </Box>
            <WorkFilter />
            <Button
              color="secondary"
              onClick={toggle}
            >
              About
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Offset />
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
            About Classical Fingerprint
          </Typography>
          <Typography variant="body2">
            I haven't written anything for this section yet.
          </Typography>
          <Typography variant="body2">
            Stay tuned!
          </Typography>
        </Box>
      </Drawer>
    </>
  );
};
