import { useRef } from 'react';
import { Work } from '../services/getMusicData';
import YouTube from 'react-youtube';

export const WorkVideo = (props: { work?: Work | null, height: number, fullHeight: number }) => {

  const { work } = props;

  const refContainer = useRef(null);

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
          height: props.height,
          overflow: 'hidden',
          background: '#000',
          position: 'relative',
        }}
      >
        <div
          style={{ marginTop: props.height - props.fullHeight }}
        >
          <YouTube
            videoId={work.preview.video_id}
            opts={{
              width: '100%',
              height: props.fullHeight,
              playerVars: {
                autoplay: 1,
                start: work.preview.preview_start_s,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
