import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import { RatedWork, useGetRatedWorks } from '../state/selectors';

interface NestedChartData {
  key: string | undefined,
  value: Array<{
    key: number,
    value: Array<RatedWork>,
  }>
};

const RatingChart = (props: {
  data: Array<NestedChartData>,
}) => {

  const colorScale = d3Scale.scaleOrdinal(
    [1, 2, 3, 4],
    ['red', 'pink', 'yellow', 'green'],
  );

  return (
    <div style={{
      // position: 'absolute',
      display: 'flex',
      width: '100%',
      background: '#ddd',
      marginBottom: 10,
    }}>
      {/* LABELS */}

      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
      }}>
        { props.data.map((d) => (
          <li key={d.key} style= {{
            height: 20,
            padding: 0,
            margin: 0,
            marginBottom: 5,
          }}>

            <label>{ d.key } </label>

          </li>
        ))}
      </ul>

      {/* DATA */}

      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
      }}>
        { props.data.map((categories) => {
          return (
            <li key={categories.key} style={{
              display: 'flex',
              height: 20,
              padding: 0,
              margin: 0,
              marginBottom: 5,
            }}>
              { categories.value.map((ratings) => {
                return (
                  <div key={ratings.key} id={String(categories.key)} style={{
                    height: 20,
                    width: (ratings.value.length || 0) * 30,
                    border: '1px solid black',
                    marginRight: '2px',
                    background: colorScale(ratings.key),
                  }} />
                );
              }) }
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export const UserStats = () => {

  const ratedWorks = useGetRatedWorks();

  const epochMap = (key: string) => {
    return key;
    // return {
    //   Medieval: 'Medieval',
    //   Renaissance: 'Renaissance',
    //   Baroque: 'Baroque',
    //   Classical: 'Classical',
    //   'Early Romantic': 'Early Romantic',
    //   Romantic: 'Romantic',
    //   'Late Romantic': 'Late Romantic',
    //   '20th Century': '20th Century',
    //   'Post-War': '20th Century',
    //   '21st Century': '20th Century',
    // }[key];
  };

  const epochOrder = ['Medieval', 'Renaissance', 'Baroque', 'Classical', 'Early Romantic', 'Romantic', 'Late Romantic', '20th Century'];

  const epochData = Array.from(
    d3Array.group(ratedWorks, d => epochMap(d.composer.epoch), d => d.rating),
    ([key, value]) => ({key, value}),
  ).map((d) => {
    return {
      key: d.key,
      value: Array.from(
        d.value,
        ([key, value]) => ({key, value})
      ).sort((a, b) => {
        return a.key - b.key;
      }),
    };
  }).sort((a, b) => {
    return epochOrder.indexOf(a.key || '') - epochOrder.indexOf(b.key || '');
  });

  const genreData = Array.from(
    d3Array.group(ratedWorks, d => d.genre, d => d.rating),
    ([key, value]) => ({key, value}),
  ).map((d) => {
    return {
      key: d.key,
      value: Array.from(
        d.value,
        ([key, value]) => ({key, value})
      ).sort((a, b) => {
        return a.key - b.key;
      }),
    };
  });

  const composerData = Array.from(
    d3Array.group(ratedWorks, d => epochMap(d.composer.name), d => d.rating),
    ([key, value]) => ({key, value}),
  ).map((d) => {
    return {
      key: d.key,
      value: Array.from(
        d.value,
        ([key, value]) => ({key, value})
      ).sort((a, b) => {
        return a.key - b.key;
      }),
    };
  });

  return (
    <div style={{
      position: 'relative',
    }}>
      
      <RatingChart data={epochData} />

      <RatingChart data={genreData} />

      <RatingChart data={composerData} />

    </div>
  );
};
