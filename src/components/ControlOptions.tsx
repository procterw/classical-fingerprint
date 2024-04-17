import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useWorkQueue } from "../state/useWorkQueue";

export const ControlOptions = () => {

  const { playMode, setPlayMode } = useWorkQueue();

  return (
    <ToggleButtonGroup
      color="secondary"
      value={playMode}
      exclusive
      onChange={(_, v) => setPlayMode(v)}
      aria-label="Platform"
    >
      <ToggleButton value="discovery">Discovery Mode</ToggleButton>
      <ToggleButton value="radio">Radio</ToggleButton>
    </ToggleButtonGroup>
  );
};
