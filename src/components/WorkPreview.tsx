import { Work } from '../services/getMusicData';

export const WorkPreview = (props: { work?: Work | null }) => {
  const { work } = props;
  
  if (!work) return null;

  return (
    <div
      style={{
        height: 400,
        overflow: 'hidden',
      }}
    >
      <iframe
        style={{
          marginTop: -60,
          height: 460,
          width: '100%',
        }}
        src={`https://www.youtube.com/embed/${work.preview.video_id}?controls=1&start=${work.preview.preview_start_s}&autoplay=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  );
};
