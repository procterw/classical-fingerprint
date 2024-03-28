import { Button, ButtonGroup, IconButton } from "@mui/material";
import { SkipNext, SkipPrevious } from "@mui/icons-material";
import { useWorkQueue } from "../state/useWorkQueue";

export const WorkControl = () => {
  const {
    activeWorkIndex,
    getNextWork,
    getPreviousWork,
   } = useWorkQueue();

  return (
    <ButtonGroup
      variant="outlined"
      orientation="horizontal"
      size="large"
      disableElevation
    >
      <IconButton
        onClick={() => getPreviousWork()}
        color="secondary"
        disabled={activeWorkIndex < 1}
        // size="large"
      >
        <SkipPrevious/>
      </IconButton>
      <Button
        startIcon={<SkipNext/>}
        onClick={() => getNextWork()}
        variant="contained"
        sx={{ borderRadius: 0 }}
        // size="large"
      >
        Another!
      </Button>
    </ButtonGroup>
  );
};

