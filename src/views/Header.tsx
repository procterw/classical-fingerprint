import { Box, Button, Toolbar, Typography } from "@mui/material";
import icon from '../assets/logo.svg';

export const Header = () => {
  return (
    <Box display="flex" flexDirection="column" mb={4}>
      <Toolbar
        disableGutters
        sx={{ display: 'flex', alignItems: 'middle', justifyContent: 'space-between' }}
      >
        {/* <Box /> */}
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

      <Typography variant="body1" sx={{ opacity: 0.7 }}>
        Learn about essential classical music • Discover composers and works that resonate with you • Build playlists of classical works
      </Typography>
    </Box>
  );
};
