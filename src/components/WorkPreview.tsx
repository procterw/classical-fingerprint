import { Work } from '../services/getMusicData';
import YouTube from 'react-youtube';

export const WorkPreview = (props: { work?: Work | null }) => {
  const { work } = props;
  
  if (!work) return null;


  // return (
    <YouTube
      videoId={work.preview.video_id}
      opts={{
        width: '100%',
        height: '460',
        playerVars: {
          autoplay: 0,
          start: work.preview.preview_start_s,
        },
      }}
      onReady={() => console.log('gotime!')}
      onPlay={() => console.log('play time')}
      // onReady=() => console.log('sdfsdfdsfdffff')
      // onPlay=() => console.log('sdfsdfsd')
      // onStateChange=() => console.log('fffff')
    />
  // );

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
          height: 400,
          overflow: 'hidden',
          background: '#000',
          position: 'relative',
          borderLeft: '10px solid #000',
          borderRight: '10px solid #000',
        }}
      >
        {/* <iframe
          style={{
            marginTop: -60,
            height: 460,
            width: '100%',
          }}
          src={`https://www.youtube.com/embed/${work.preview.video_id || 'syK3EZpi1sw'}?controls=1&start=${work.preview.preview_start_s}&autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        /> */}
        <div
          style={{
            marginTop: -60,
            // boxShadow: '0 0 2px 2px rgba(0,0,0,0.8)'
          }}>
          <YouTube
            videoId={work.preview.video_id}
            opts={{
              width: '100%',
              height: '460',
              // marginTop: -60 ,
              playerVars: {
                autoplay: 1,
                start: work.preview.preview_start_s,
              },
            }}
            onReady={() => console.log('gotime!')}
            onPlay={() => console.log('play time')}
            // onReady=() => console.log('sdfsdfdsfdffff')
            // onPlay=() => console.log('sdfsdfsd')
            // onStateChange=() => console.log('fffff')
          />
        </div>
      </div>
      {/* <div
        style={{
          width: '100%',
          height: 15,
          background: 'black',
        }}
      /> */}
    </div>
  );
};
