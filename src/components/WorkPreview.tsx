import { Work } from '../services/getMusicData';

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
          height: 15,
          background: 'black',
        }}
      />
      <div
        style={{
          height: 400,
          overflow: 'hidden',
          background: 'black',
          position: 'relative',
          borderLeft: '15px solid black',
          borderRight: '15px solid black',
        }}
      >
        <iframe
          style={{
            marginTop: -60,
            height: 460,
            width: '100%',
          }}
          src={`https://www.youtube.com/embed/${work.preview.video_id || 'syK3EZpi1sw'}?controls=1&start=${work.preview.preview_start_s}&autoplay=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </div>
      <div
        style={{
          width: '100%',
          height: 15,
          background: 'black',
        }}
      />
    </div>
  );
};
