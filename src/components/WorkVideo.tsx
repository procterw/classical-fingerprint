import { useEffect, useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import { useWidth } from '../state/useWidth';
import { useWorkQueue } from '../state/useWorkQueue';

const videoState = {
  id: '',
  start: 0,
  mode: '',
  loading: false,
  tt: null,
  e: {
    initialPlay: false,
    secondPlay: false,
  },
  reset: function() {
    this.loading = false,
    this.e.initialPlay = false;
    this.e.secondPlay = false;
  },
};

type Player = {
  pauseVideo: Function,
  mute: Function,
  unMute: Function,
  playVideo: Function,
  seekTo: Function,
  stopVideo: Function,
  loadVideoById: Function,
};

export const WorkVideo = (props: { work?: Work | null}) => {
  const { work } = props;
  const [loading, setLoading] = useState(true);
  const { getNextWork, playMode } = useWorkQueue();
  const [playerReady, setPlayerReady] = useState(false);
  const [player, setPlayer] = useState<Player | null>(null);

  videoState.id = work?.yt_id || '';
  videoState.start = work?.yt_start || 0;
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

    if (player) {
      player.stopVideo();
      player.loadVideoById(work?.yt_id, getStartTime());
    }
  }, [work?.yt_id, playerReady]);

  useEffect(() => {
    rescale();

    var tag = document.createElement('script');
    tag.id = 'iframe-demo';
    tag.src = 'https://www.youtube.com/iframe_api';

    var firstScriptTag = document.getElementsByTagName('script')[0];
    // @ts-ignore
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let _player: Player;

    // @ts-ignore
    window.onYouTubeIframeAPIReady = () => {
      // @ts-ignore
      new window.YT.Player(`yt-player`, {
        events: {
          'onReady': onReady,
          'onStateChange': onStateChange,
          'onError': onError,
        }
      });
    }

    // https://developers.google.com/youtube/iframe_api_reference
    function onError(error: { data: number }) {
      if ([2, 5, 100, 101, 150].includes(error.data)) {
        videoState.reset();
        setLoading(false);
      }
    }

    function onReady(event: { target: Player  }) {
      _player = event.target;
      setPlayer(event.target);
      setPlayerReady(true);
    }

    function onStateChange(event: { data: number, target: Player }) {
      if (event.data === 0) {
        if (videoState.mode === 'radio') {
          getNextWork();
        }
      }

      // If the video is 'unstarted', go through a series of steps
      // to force the video back to the correct start time
      if (event.data === -1 && !videoState.loading) {
        videoState.loading = true;

        _player.pauseVideo();
        // Because we have to play the video in order to seekTo the
        // correct time, make sure it is muted
        _player.mute();
        
        setTimeout(() => {
          // This gets youtube's 'currentTime' out of it's system;
          // It will try to force the player back to where you watched it last
          // even if you use "start" and "seekTo"
          videoState.e.initialPlay = true;
          _player.playVideo();
        }, 100);
      }

      // If a play was triggered from within the "understarted" block...
      if (event.data === 1 && videoState.e.initialPlay) {
          // Now go to the correct time
        _player.seekTo(getStartTime());

        setTimeout(() => {
          videoState.e.secondPlay = true;
          videoState.e.initialPlay = false;
          _player.playVideo();
        }, 250);
        // }, 250);
      }

      if (event.data === 1 && videoState.e.secondPlay) {
        _player.unMute();
        setTimeout(() => {
          videoState.reset();
          setLoading(false);
        }, 250);
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
            // opacity: 0.5,
            // transition: loading ? undefined : '0.25s opacity',
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
