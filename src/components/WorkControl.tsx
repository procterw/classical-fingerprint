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
      variant="contained"
      orientation="horizontal"
      sx={{ borderRadius: 0 }}
      size="large"
    >
      <IconButton
        onClick={() => getPreviousWork()}
        // variant="contained"
        color="secondary"
        disabled={activeWorkIndex < 1}
        sx={{ borderRadius: 0 }}
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

