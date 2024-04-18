import { Button, ButtonGroup, Tooltip } from "@mui/material";
import { useWorkQueue } from "../state/useWorkQueue";

export const ControlOptions = () => {

  const { playMode, setPlayMode } = useWorkQueue();

  return (
    <ButtonGroup
      variant="contained"
      aria-label="Platform"
    >
      <Tooltip title="Start videos at curated timestamp to get a feel for each work">
        <Button value="discovery"
          color={playMode === 'discovery' ? 'secondary' : 'info'}
          onClick={() => setPlayMode('discovery')}
        >
          Discovery
        </Button>
      </Tooltip>
      <Tooltip title="Start videos at the beginning and play another work when videos end">
        <Button value="radio"
          color={playMode === 'radio' ? 'secondary' : 'info'}
          onClick={() => setPlayMode('radio')}
        >
          Radio
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
};
