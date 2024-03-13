import { Work } from './services/getMusicData';

import './App.css'
import { RatingModule } from './components/RatingModule';

export const WorkCard = (props: { work?: Work | null }) => {

  const { work } = props;
  
  if (!work) return null;

  return (
    <>
      <h2>{ work.title }</h2>
      <h3>{ work.composer?.complete_name }</h3>

      <iframe
        width="600"
        height="300"
        src={`https://www.youtube.com/embed/${work.preview.video_id}?controls=1&start=${work.preview.preview_start_s}&autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      >
        </iframe>

      <div
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <RatingModule workId={work.id} />
      </div>

      <pre
        style={{
          textAlign: 'left'
        }}
      >
        { JSON.stringify(props.work, null, 2) }
      </pre>
    </>
  )
};
