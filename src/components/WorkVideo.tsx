import { useEffect, useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import { useWidth } from '../state/useWidth';
import { useWorkQueue } from '../state/useWorkQueue';

const videoState = {
  start: 0,
  mode: '',
  loading: false,
  tt: null,
};

export const WorkVideo = (props: { work?: Work | null}) => {
  const { work } = props;
  const [loading, setLoading] = useState(true);
  const { getNextWork, playMode } = useWorkQueue();
  const [playerReady, setPlayerReady] = useState(false);
  const [player, setPlayer] = useState(null);

  videoState.id = work?.yt_id;
  videoState.start = work?.yt_start;
  videoState.mode = playMode;

  const calcHeight = () => {
    const height = window.innerHeight * 0.45;
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

  const getStartTime = () => {
    return videoState.mode === 'discovery' ? videoState.start : 0;
  };

  useEffect(() => {
    if (!work?.yt_id) return;
    if (!playerReady) return;

    setLoading(true);
    videoState.loading = false;

    player.stopVideo();
    player.loadVideoById(work?.yt_id, getStartTime());

  }, [work?.yt_id, playerReady]);

  useEffect(() => {
    rescale();

    var tag = document.createElement('script');
    tag.id = 'iframe-demo';
    tag.src = 'https://www.youtube.com/iframe_api';

    var firstScriptTag = document.getElementsByTagName('script')[0];
    // @ts-ignore
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    // @ts-ignore
    let _player;
    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player(`yt-player`, {
        events: {
          'onReady': onReady,
          'onStateChange': onStateChange,
        }
      });
    }

    function onReady(event) {
      _player = event.target;
      setPlayer(event.target);
      setPlayerReady(true);
    }

    function onStateChange(event) {

      if (event.data === 1 && videoState.loading) {
        _player.seekTo(getStartTime());
        _player.unMute();

        setTimeout(() => {
          _player.pauseVideo();
          _player.seekTo(getStartTime());
          setTimeout(() => {
            _player.playVideo();
            _player.unMute();
            videoState.loading = false;
  
            setTimeout(() => {
              setLoading(false);
            }, 200);
          }, 200);
        }, 200);
      }


      // If the video is 'unstarted', go through a series of steps
      // to force the video back to the correct start time
      if (event.data === -1 && !videoState.loading) {
        videoState.loading = true;
        _player.pauseVideo();
        _player.mute();

        // https://stackoverflow.com/a/76468771/1676699
        fetch(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoState.id}&format=json`)
          .then((r) => {
            // Checks if the video is available and embeddable
            // Otherwise, clear the loading screen so the user can see what's going on
            if (r.status !== 200) {
              videoState.loading = false;
              setLoading(false);
            }
          });

        setTimeout(() => {
          // This gets youtube's 'currentTime' out of it's system
          _player.playVideo();
        }, 100);
      }
    }

    window.addEventListener('resize', rescale);
    return () => {
      window.removeEventListener('resize', rescale);
    }
  }, []);

  const offset = 50;

  if (!work) return null;

  const params = new URLSearchParams({
    enablejsapi: '1',
    autoplay: '1',
    // start: playMode === 'discovery' ? String(work.yt_start) : '1',
    color: 'white',
    fs: '0', // disable fullscreen
    iv_load_policy: '3', // disable annotations
    rel: '0', // only show related videos from same channel
  });

  // const url = `https://www.youtube.com/embed/${work.yt_id}?${params.toString()}`;
  const url = `https://www.youtube.com/embed/rEGOihjqO9w?${params.toString()}`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
      mb={2}
    >
      <Box
        position="relative"
        sx={{
          height: height,
          overflow: 'hidden',
          background: '#000',
          position: 'relative',
          borderRadius: 3,
          borderTop: '6px solid #000',
        }}
      >
        <Box
          position="absolute"
          display="flex"
          // display={loading ? "flex" : "none"}
          sx={{
            background: 'black',
            height: '100%',
            opacity: loading ? 1 : 0,
            // transition: '0.3s opacity',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            pointerEvents: 'none',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Skeleton 
            variant="rounded"
            sx={{
              bgcolor: 'grey.800',
              position: 'absolute',
              width: 170,
              height: 24,
              bottom: 8,
              left: 11.5,
            }} 
          />
          <Skeleton 
            variant="rounded"
            sx={{
              bgcolor: 'grey.800',
              position: 'absolute',
              width: 145,
              height: 24,
              bottom: 8,
              right: 11.5,
            }} 
          />
          <Skeleton 
            variant="rectangular"
            sx={{
              bgcolor: 'grey.800',
              position: 'absolute',
              height: 3.5,
              bottom: 40,
              left: 11.5,
              right: 11.5,
            }} 
          />
          <Skeleton 
            variant="circular"
            sx={{
              bgcolor: 'grey.800',
              width: 100,
              height: 100,
              marginBottom: 4,
            }} 
          />
        </Box>
        <Box
          style={{
            marginTop: 0 - offset - 6,
            // filter: 'grayscale(100%)'
            // opacity: loading ? 1 : 1,
            // transition: 'opacity 0.2s',
          }}
        >
          <iframe
            id={`yt-player`}
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
