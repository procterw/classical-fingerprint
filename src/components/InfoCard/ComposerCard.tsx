import { Box, Link, Paper, Typography } from "@mui/material";
import { useWidth } from "../../state/useWidth";
import { CollapsibleSection } from "../CollapsibleSection";

export const ComposerAvatar = (props: { composer?: Composer, avatarSize: number }) => {
  const { composer, avatarSize } = props;

  if (!composer) return null;

  const borderSize = 0;

  return (
    <Paper elevation={2}
      sx={{
        borderRadius: avatarSize,
        width: avatarSize,
        height: avatarSize,
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
        }}
      />
    </Paper>
  );
};

export const ComposerCard = (props: { composer?: Composer }) => {
  const { composer } = props;

  const mq = useWidth();

  if (!composer) return null;

  return (
    <Box>
      <CollapsibleSection>
        <Box sx={{ float: 'left', mb: 2, mr: 2 }} >
          <ComposerAvatar composer={composer} avatarSize={mq.mobile(60, 75)} />
        </Box>

        <Box>

          <Typography
            sx={{ mb: 1 }}
            variant="body2">
            { composer.biography }
          </Typography>

          <Link
            href={composer.wiki_url}
            target="_blank"
            fontSize={14}
          >
            Biography from Wikipedia
          </Link>
        </Box>
      </CollapsibleSection>
    </Box>
  );
};
