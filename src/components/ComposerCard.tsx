import { Composer } from "../services/getMusicData";
import { Box, Stack, Typography } from "@mui/material";
import { EpochTimeLine } from "./EpochTimeLine";

export const ComposerCard = (props: { composer?: Composer }) => {
  const { composer } = props;

  if (!composer) return null;

  const avatarSize = 75;

  return (
    <Box
      display="flex"
    >
        <div
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize,
            boxShadow: '5px 5px 0px 0px #58A8DC',
          }}
        >
          <img
            src={composer.portrait}
            width={avatarSize}
            height={avatarSize}
            style={{
              borderRadius: avatarSize,
              filter: 'grayscale(80%)  sepia(100%) hue-rotate(170deg)',
            }}
          />
        </div>

        <Typography variant="h5" sx={{ mb: 1, mt: 0, whiteSpace: 'no-wrap' }} >
          { composer.complete_name }
        </Typography>

        <EpochTimeLine composer={composer} />
    </Box>
  );
};
