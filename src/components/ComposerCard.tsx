import { Composer } from "../services/getMusicData";
import { Box, Link, Typography } from "@mui/material";

export const ComposerAvatar = (props: { composer?: Composer, avatarSize: number }) => {
  const { composer, avatarSize } = props;

  if (!composer) return null;

  return (
    <Box
      sx={{
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize,
      }}
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
  );
};

export const ComposerCard = (props: { composer?: Composer }) => {
  const { composer } = props;

  if (!composer) return null;

  return (
    <Box px={3}>  

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
        p={2}
        sx={{
          backgroundColor: theme => theme.palette.background.paper,
        }}
      >
          <ComposerAvatar composer={composer} avatarSize={80} />

          <Box sx={{ ml: 2 }}>

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
