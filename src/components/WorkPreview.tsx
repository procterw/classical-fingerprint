import { useRef } from 'react';
import { Work } from '../services/getMusicData';
import { useWidth } from '../state/useWidth';

export const WorkPreview = (props: { work?: Work | null }) => {

  const { work } = props;

  const refContainer = useRef(null);
  const mq = useWidth();

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
          height: 'calc(50vh)',
          minHeight: mq(200, 300),
          overflow: 'hidden',
          background: '#000',
          position: 'relative',
        }}
      >
        <iframe
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
        />
      </div>
    </div>
  );
};
