import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import { RatedWork, useGetRatedWorks } from '../state/selectors';
import { Favorite, ThumbDown, ThumbDownAltRounded, ThumbDownOutlined, ThumbDownRounded, ThumbUp, ThumbUpRounded } from '@mui/icons-material';
import { themeOptions } from '../main';
import { Box, Grid, Typography } from '@mui/material';

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


  // const x = `repeating-linear-gradient(-45deg, white, white 2px, ${themeOptions.palette?.primary.main} 2px, ${themeOptions.palette?.primary.main} 4px)`;

  const colorScale = d3Scale.scaleOrdinal(
    [1, 2, 3],
    [
      'black',
      `repeating-linear-gradient(-45deg, white, white 2px, ${themeOptions.palette?.primary.main} 2px, ${themeOptions.palette?.primary.main} 4px)`,
      themeOptions.palette?.primary.main,
    ],
  );

  return (
    <div style={{
      // position: 'absolute',
      display: 'flex',
      width: '100%',
      // background: '#ddd',
      marginBottom: 10,
    }}>
      {/* LABELS */}

      {/* <ul style={{
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
      </ul> */}

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
              flexDirection: 'column',
              // height: 20,
              padding: 0,
              margin: 0,
              marginBottom: 5,
            }}>
              <Typography variant="h5">
                { categories.key }
              </Typography>
              <Box display="flex" flexDirection="row">
                { categories.value.map((ratings) => {
                  return (
                    <Box mr={1}>
                      { ratings.value.map((_) => {
                        if (ratings.key === 1) {
                          return <ThumbDownOutlined fontSize="small"   />
                        }
                        if (ratings.key === 2) {
                          return <ThumbUpRounded fontSize="small" />
                        }
                        if (ratings.key === 3) {
                          return <Favorite fontSize="small" color="primary" />
                        }
                      }) }
                    </Box>
                  );
                // return (
                //   <div key={ratings.key} id={String(categories.key)} style={{
                //     height: 20,
                //     width: (ratings.value.length || 0) * 30,
                //     border: '1px solid black',
                //     marginRight: '2px',
                //     background: colorScale(ratings.key),
                //   }} />
                // );
                }) }
              </Box>
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
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <RatingChart data={epochData} />
      </Grid>
      <Grid item xs={6}>
        <RatingChart data={genreData} />
      </Grid>
      {/* <RatingChart data={composerData} /> */}
    </Grid>
  );
};
