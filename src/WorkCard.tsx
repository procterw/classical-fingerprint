import { Work } from './services/getMusicData';

import './App.css'

export const WorkCard = (props: { work?: Work }) => {

  const { work } = props;
  
  if (!work) return null;

  return (
    <>
      <h2>{ work.title }</h2>
      <h3>{ work.composer?.complete_name }</h3>

      <iframe
        width="600"
        height="300"
        src={`https://www.youtube.com/embed/${work.preview.video_id}?controls=0&amp;start=${work.preview.preview_start_s}&autoplay=1`}
        title="YouTube video player"
        // frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      >
        </iframe>

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
