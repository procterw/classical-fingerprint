import { Button, ButtonGroup, IconButton } from "@mui/material";
import { SkipNext, SkipPrevious } from "@mui/icons-material";
import { useWorkQueue } from "../state/useWorkQueue";
import { useWidth } from "../state/useWidth";

export const WorkControl = () => {
  const {
    activeWorkIndex,
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
        disabled={activeWorkIndex < 1}
        sx={{ borderRadius: 0 }}
      >
        <SkipPrevious/>
      </Button>
      <Button
        startIcon={<SkipNext/>}
        onClick={() => getNextWork()}
        variant="contained"
        fullWidth={mq.small(true, false)}
        sx={{ borderRadius: 0 }}
        // size="large"
      >
        Another!
      </Button>
    </ButtonGroup>
  );
};

