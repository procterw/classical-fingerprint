import { Composer } from "../services/getMusicData";
import { Stack, Typography } from "@mui/material";
import { EpochTimeLine } from "./EpochTimeLine";

export const ComposerCard = (props: { composer?: Composer }) => {
  const { composer } = props;

  if (!composer) return null;

  return (
    <Stack>
      <Stack direction="row" spacing={2}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 5,
            boxShadow: '5px 5px 0px 0px #58A8DC',
          }}
        >
        <img
          src={composer.portrait}
          width={100}
          height={100}
          style={{
            borderRadius: 5,
            filter: 'grayscale(80%)  sepia(100%) hue-rotate(170deg)',
          }}
        />
        </div>

        <Stack style={{ width: '100%' }}  >
          <Typography variant="h5" sx={{ mb: 1, mt: 0 }}>
            { composer.complete_name }
          </Typography>
          <EpochTimeLine composer={composer} />
        </Stack>

      </Stack>

    </Stack>
  );
};
