import { AppBar, Box, Button, Container, Toolbar, Typography, styled } from "@mui/material";
import icon from '../assets/logo.svg';
import { useWidth } from "../state/useWidth";
import { WorkFilter } from "../components/WorkFilter";

export const Header = () => {
  const mq = useWidth();
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

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
            <Button color="secondary">
              About
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Offset />
    </>
  );
};
