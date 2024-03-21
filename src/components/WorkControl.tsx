import { Button, ButtonGroup } from "@mui/material";
import { SkipNext, SkipPrevious } from "@mui/icons-material";
import { useWorkQueue } from "../state/useWorkQueue";

export const WorkControl = () => {
  const {
    previousWorks,
    getNextWork,
    getPreviousWork,
   } = useWorkQueue();

  return (
    <ButtonGroup
      variant="contained"
      orientation="horizontal"
      sx={{
        my: 1,
        boxShadow: 'none',
      }}
    >
      <Button
        startIcon={<SkipPrevious/>}
        onClick={() => getPreviousWork()}
        variant="contained"
        color="secondary"
        disabled={previousWorks.length < 1}
      >
      </Button>
      <Button
        startIcon={<SkipNext/>}
        onClick={() => getNextWork()}
        variant="contained"
      >
        Next
      </Button>
    </ButtonGroup>
  );
};

