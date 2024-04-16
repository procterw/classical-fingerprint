import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useWidth } from '../state/useWidth';

export const WorkVideo = (props: { work?: Work | null}) => {
  const { work } = props;

  const calcHeight = () => {
    const height = window.innerHeight * 0.5;
    const totalWidth = window.innerWidth;
    return Math.min(height, totalWidth / 1.5);
  }

  const [height, setHeight] = useState(calcHeight());
  const mq = useWidth();

  const rescale = () => {
    // On mobile, don't constantly resize the window
    mq.mobile(
      undefined,
      setHeight(calcHeight())
    );
  };

  useEffect(() => {
    rescale();

    window.addEventListener('resize', rescale);
    return () => {
      window.removeEventListener('resize', rescale);
    }
  }, []);

  const offset = 50;

  if (!work) return null;

  const params = new URLSearchParams({
    autoplay: '1',
    start: String(work.yt_start),
    color: 'white',
    fs: '0', // disable fullscreen
    iv_load_policy: '3', // disable annotations
    rel: '0', // only show related videos from same channel
  });

  const url = `https://www.youtube.com/embed/${work.yt_id}?${params.toString()}`

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
      mb={2}
    >
      <Box
        sx={{
          height: height,
          overflow: 'hidden',
          background: '#000',
          position: 'relative',
          borderRadius: 3,
          // borderTop: '8px solid #000',
          // borderBottom: '8px solid #000',
        }}
      >
        <Box
          style={{
            marginTop: 0 - offset - 8,
            // filter: 'grayscale(100%)'
          }}
        >
          <iframe
            width="100%"
            height={height + offset}
            src={url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
            referrerPolicy="strict-origin-when-cross-origin"
            frameBorder="0"
          />
        </Box>
      </Box>
    </Box>
  );
};
