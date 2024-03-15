import { Work } from '../services/getMusicData';
import { DefinitionMatch, getWorkTitleDefinitions } from '../services/getWorkTitleDefinitions';

export const DefinitionList = (props: { work?: Work | null }) => {

  const { work } = props;
  
  if (!work) return null;

  return (
    <>
      <ul>
        { getWorkTitleDefinitions(work.title).map((d: DefinitionMatch) => {
          return (
            <li
              key={d.label}
              style={{ color: 'white', background: 'black' }}
            >
              <h5>{ d.match }</h5>
              {/* <h5>{ d.label }</h5> */}
              <p>{ d.definition }</p>
            </li>
          );
        }) }
      </ul>
    </>
  );
};
