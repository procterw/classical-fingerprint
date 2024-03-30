import { Composer } from "../services/getMusicData";
import { Box, Link, Typography } from "@mui/material";
import { useWidth } from "../state/useWidth";

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

  const mq = useWidth();

  if (!composer) return null;

  return (
    <Box
      display="flex"
      p={2}
      sx={{
        backgroundColor: theme => theme.palette.background.paper,
      }}
    >
        <ComposerAvatar composer={composer} avatarSize={mq(60, 80)} />

        <Box sx={{ ml: 2,  }}>

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
  );
};
