import { Composer } from "../services/getMusicData";
import { Box } from "@mui/material";

export const ComposerCard = (props: { composer?: Composer }) => {
  const { composer } = props;

  if (!composer) return null;

  const avatarSize = 80;

  return (
    <Box
      display="flex"
    >
        <div
          style={{
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
        </div>
    </Box>
  );
};
