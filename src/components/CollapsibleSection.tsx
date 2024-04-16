import { ExpandCircleDown } from "@mui/icons-material";
import { Box, Button, Collapse } from "@mui/material";
import { ReactNode, useEffect, useRef, useState } from "react";

export const CollapsibleSection = (props: {
  children: ReactNode,
  contentKey: string,
  height?: number,
}) => {
  const childRef = useRef(null);
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const [childHeight, setChildHeight] = useState(0);

  const height = props.height || 110;

  useEffect(() => {
    setOpen(false);
    // @ts-ignore
    setChildHeight(childRef?.current?.offsetHeight || 0);
  }, [props.contentKey])

  const alwaysOpen = childHeight < (height + 20);

  return (
    <Box>
      <Collapse in={open || alwaysOpen} collapsedSize={height} timeout={0.3}>
        <Box ref={childRef}>
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


      { !alwaysOpen && (
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
      )}

    </Box>
  );
};