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
          width: '100%',
          height: '15px',
          background: '#000',
        }}
      />
      <div
        style={{
          height: 650,
          overflow: 'hidden',
          background: '#000',
          position: 'relative',
          borderLeft: '10px solid #000',
          borderRight: '10px solid #000',
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
              height: '710',
              // marginTop: -60 ,
              playerVars: {
                autoplay: 0,
                start: work.preview.preview_start_s,
              },
            }}
            onReady={() => console.log('gotime!')}
            onPlay={() => console.log('play time')}
            onStateChange={() => console.log('hello?????')}
          />
        </div>
      </div>
    </div>
  );
};
