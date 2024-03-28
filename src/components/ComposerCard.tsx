import { Composer } from "../services/getMusicData";
import { Box, Link, Paper, Typography } from "@mui/material";

export const ComposerCard = (props: { composer?: Composer }) => {
  const { composer } = props;

  if (!composer) return null;

  const avatarSize = 80;

  return (
    <Box mx={3}>

      <Typography
        variant="h3"
        sx={{
          mt: 0,
          mb: 2,
        }} >
        { composer.complete_name }
      </Typography>
      
      <Box
        display="flex"
        // my={2}
        // backgroundColor="paper"
        p={2}
        sx={{
          backgroundColor: theme => theme.palette.background.paper,
        }}
      >
          <Box
            sx={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize,
            }}
            mr={2}
          >
            <img
              src={composer.portrait}
              width={avatarSize}
              height={avatarSize}
              style={{
                borderRadius: avatarSize,
                border: '1px solid black',
                filter: 'grayscale(100%)  sepia(100%) hue-rotate(-40deg) contrast(110%)',
              }}
            />
          </Box>

          <Box>

            <Typography
              sx={{ mb: 1 }}
              variant="body1">
              { composer.bio_preview }
            </Typography>

            <Link
              href={composer.wiki_url}
              target="_blank"
            >
              Biography from Wikipedia
            </Link>
          </Box>
      </Box>

    </Box>
  );
};
