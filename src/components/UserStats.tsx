import * as d3Array from 'd3-array';
import { RatedWork, useGetRatedWorks } from '../state/selectors';
import { Favorite, ThumbDownOutlined, ThumbUpRounded } from '@mui/icons-material';
import { Box, Grid, Paper, Typography } from '@mui/material';

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

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      marginBottom: 10,
    }}>
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
              <Typography variant="h4" fontSize={15} fontWeight={500} sx={{ mb: 1 }}>
                { categories.key }
              </Typography>
              <Box display="flex" flexDirection="row">
                { categories.value.map((ratings) => {
                  return (
                    <Box mr={0.4}>
                      { ratings.value.map((_) => {
                        if (ratings.key === 1) {
                          // TODO change color value to not be hardcoded
                          return <ThumbDownOutlined fontSize="small" sx={{ color: '#757575' }}  />
                        }
                        if (ratings.key === 2) {
                          return <ThumbUpRounded fontSize="small" sx={{ color: '#757575' }} />
                        }
                        if (ratings.key === 3) {
                          return <Favorite fontSize="small" color="primary" />
                        }
                      }) }
                    </Box>
                  );
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

  // const composerData = Array.from(
  //   d3Array.group(ratedWorks, d => epochMap(d.composer.name), d => d.rating),
  //   ([key, value]) => ({key, value}),
  // ).map((d) => {
  //   return {
  //     key: d.key,
  //     value: Array.from(
  //       d.value,
  //       ([key, value]) => ({key, value})
  //     ).sort((a, b) => {
  //       return a.key - b.key;
  //     }),
  //   };
  // });

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Summary
      </Typography>

      <Paper
        elevation={0}
        square={true}
        sx={{
          p: 2,
          my: 3,
        }}
      >

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <RatingChart data={epochData} />
          </Grid>
          <Grid item xs={6}>
            <RatingChart data={genreData} />
          </Grid>
          {/* <RatingChart data={composerData} /> */}
        </Grid>
      </Paper>
    </Box>
  );
};
