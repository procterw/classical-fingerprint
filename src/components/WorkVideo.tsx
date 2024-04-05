import { useEffect, useState } from 'react';
import { Work } from '../services/getMusicData';
import YouTube from 'react-youtube';

export const WorkVideo = (props: { work?: Work | null}) => {
  const { work } = props;

  const [height, setHeight] = useState(window.innerHeight * 0.5);

  const rescale = () => {
    setHeight(window.innerHeight * 0.5);
  };

  useEffect(() => {
    rescale();

    window.addEventListener('scroll', rescale);
    window.addEventListener('resize', rescale);
    return () => {
      window.removeEventListener('scroll', rescale);
      window.removeEventListener('resize', rescale);
    }
  }, []);

  const offset = 60;

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
          height: height,
          overflow: 'hidden',
          background: '#000',
          position: 'relative',
        }}
      >
        <div
          style={{ marginTop: 0 - offset }}
        >
          <YouTube
            videoId={work.preview.video_id}
            opts={{
              width: '100%',
              height: height + offset,
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
