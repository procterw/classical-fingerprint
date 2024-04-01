import { useEffect, useRef, useState } from 'react';
import { Work } from '../services/getMusicData';
import { useWidth } from '../state/useWidth';
import YouTube from 'react-youtube';
import debounce from 'debounce';

export const WorkPreview = (props: { work?: Work | null }) => {

  const { work } = props;

  const refContainer = useRef(null);
  const mq = useWidth();


  const [height, setHeight] = useState<number>(window.innerHeight);

  const resetHeight = debounce(() => setHeight(window.innerHeight), 200);

  useEffect(() => {
    window.addEventListener('resize', resetHeight);
    return () => window.removeEventListener('resize', resetHeight);
  }, []);

  console.log(work?.preview.preview_start_s);

  if (!work) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      ref={refContainer}
    >
      <div
        style={{
          height: 'calc(50vh + 60px)',
          minHeight: mq(200, 300),
          overflow: 'hidden',
          background: '#000',
          position: 'relative',
        }}
      >
        {/* <iframe
          style={{
            marginTop: -60,
            height: 'calc(50vh + 60px)',
            width: '100%',
            minHeight: mq(260, 360),
          }}
          src={`https://www.youtube.com/embed/${work.preview.video_id || 'syK3EZpi1sw'}?controls=1&start=${work.preview.preview_start_s}&autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        /> */}
          <div
            style={{ marginTop: -60 }}
          >
            <YouTube
              videoId={work.preview.video_id}
              opts={{
                width: '100%',
                height: (height / 2) + 120,
                // height: '710',
                playerVars: {
                  autoplay: 1,
                  // autoplay: 0,
                  start: work.preview.preview_start_s,
                },
              }}
              // onReady={() => console.log('gotime!')}
              // onPlay={() => console.log('play time')}
              // onStateChange={() => console.log('hello?????')}
            />
          </div>
      </div>
    </div>
  );
};
