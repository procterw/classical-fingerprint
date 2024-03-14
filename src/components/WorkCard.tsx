import { Work } from '../services/getMusicData';

export const WorkCard = (props: { work?: Work | null }) => {

  const { work } = props;
  
  if (!work) return null;

  return (
    <>
      <h2>{ work.title }</h2>
    </>
  );
};
