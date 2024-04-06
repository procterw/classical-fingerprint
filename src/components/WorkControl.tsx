import { Button, ButtonGroup } from "@mui/material";
import { SkipNext, SkipPrevious } from "@mui/icons-material";
import { useWorkQueue } from "../state/useWorkQueue";
import { useWidth } from "../state/useWidth";

export const WorkControl = () => {
  const {
    disablePrevious,
    getNextWork,
    getPreviousWork,
   } = useWorkQueue();

   const mq = useWidth();

  return (
    <ButtonGroup
      variant="outlined"
      orientation="horizontal"
      size="medium"
      disableElevation
      sx={{
        flexGrow: mq.small(1, 0)
      }}
    >
      <Button
        variant="outlined"
        onClick={() => getPreviousWork()}
        color="secondary"
        disabled={disablePrevious}
        // sx={{ borderRadius: 0 }}
      >
        <SkipPrevious fontSize="small" />
      </Button>
      <Button
        startIcon={<SkipNext/>}
        onClick={() => getNextWork()}
        variant="contained"
        fullWidth={mq.small(true, false)}
        // sx={{ borderRadius: 0 }}
        // size="large"
      >
        Another!
      </Button>
    </ButtonGroup>
  );
};
