import { Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useWorkQueue } from "../state/useWorkQueue";

export const ControlOptions = () => {

  const { playMode, setPlayMode } = useWorkQueue();

  return (
    <ButtonGroup
      // color="secondary"
      variant="contained"
      // value={playMode}
      // exclusive
      // onChange={(_, v) => setPlayMode(v)}
      aria-label="Platform"
      // sx={{
      //   height: 43,
      // }}
    >
      <Button value="discovery"
        color={playMode === 'discovery' ? 'secondary' : 'info'}
        onClick={() => setPlayMode('discovery')}
      >
        Discovery
      </Button>
      <Button value="radio"
        color={playMode === 'radio' ? 'secondary' : 'info'}
        onClick={() => setPlayMode('radio')}
      >
        Radio
      </Button>
    </ButtonGroup>
  );
};
