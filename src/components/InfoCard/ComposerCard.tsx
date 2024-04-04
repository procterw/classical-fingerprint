import { Composer } from "../../services/getMusicData";
import { Box, Link, Typography } from "@mui/material";
import { useWidth } from "../../state/useWidth";

export const ComposerAvatar = (props: { composer?: Composer, avatarSize: number }) => {
  const { composer, avatarSize } = props;

  if (!composer) return null;

  const borderSize = 2;

  return (
    <Box
      sx={{
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize,
        background: '#da6a57;',
      }}
    >
      <img
        src={composer.portrait}
        width={avatarSize - (borderSize * 2)}
        height={avatarSize - (borderSize * 2)}
        style={{
          borderRadius: avatarSize,
          marginLeft: borderSize,
          marginTop: borderSize,
          // filter: 'grayscale(100%)  sepia(100%) hue-rotate(-40deg) contrast(110%)',
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
    <Box>
      <Box sx={{ float: 'left', mb: 2, mr: 2 }} >
        <ComposerAvatar composer={composer} avatarSize={mq.mobile(60, 80)} />
      </Box>

      <Box>

        <Typography
          sx={{ mb: 1 }}
          variant="body2">
          { composer.bio_preview }
        </Typography>

        <Link
          href={composer.wiki_url}
          target="_blank"
          fontSize={14}
        >
          Biography from Wikipedia
        </Link>
      </Box>
    </Box>
  );
};
