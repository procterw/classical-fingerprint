import { Box, Button, Toolbar, Typography } from "@mui/material";
import icon from '../assets/logo.svg';
import { useWidth } from "../state/useWidth";

export const Header = () => {
  const mq = useWidth();

  return (
    <Box display="flex" flexDirection="column" mb={4} px={mq.mobile(2, 0)}>
      <Toolbar
        disableGutters
        sx={{ display: 'flex', alignItems: 'middle', justifyContent: 'space-between' }}
      >
        {/* <Box /> */}
        <Box display="flex" alignItems="middle">
          <img
            src={icon}
            width={28}
            height={28}
            style={{ marginRight: 8 }}
          />
          <Typography
            variant="h4"
            fontSize={21}
            fontWeight={500}
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
