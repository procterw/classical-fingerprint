import { Work } from '../services/getMusicData';
import YouTube from 'react-youtube';

export const WorkPreview = (props: { work?: Work | null }) => {
  const { work } = props;
  
  if (!work) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          height: 450,
          overflow: 'hidden',
          background: '#000',
          position: 'relative',
        }}
      >
        <div
          style={{
            marginTop: -60,
          }}>
          <YouTube
            videoId={work.preview.video_id}
            opts={{
              width: '100%',
              height: '510',
              playerVars: {
                autoplay: 1,
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
