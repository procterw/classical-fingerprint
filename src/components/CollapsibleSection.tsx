import { ExpandCircleDown } from "@mui/icons-material";
import { Box, Button, Collapse } from "@mui/material";
import { ReactNode, useState } from "react";

export const CollapsibleSection = (props: {
  children: ReactNode,
  height?: number,
}) => {

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  const height = props.height || 94;

  return (
    <Box>
      <Collapse in={open} collapsedSize={height}>
        <Box>
          { props.children }
        </Box>
      </Collapse>
{/* 
      { !open && (
        <Box
          position="absolute"
          width="100%"
          height={10}
          sx={{
            marginTop: '-10px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
          }}
        />
      )} */}

      <Button
        // variant="outlined"
        color="secondary"
        size="small"
        startIcon={<ExpandCircleDown />}
        onClick={toggle}
        sx={{
          fontSize: 13,
        }}
      >
        Show more
      </Button>

    </Box>
  );
};