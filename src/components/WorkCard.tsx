import { Box, Typography, Zoom, Tooltip } from '@mui/material';
import { Work } from '../services/getMusicData';
import { ComposerCard } from './ComposerCard';
import { getWorkTitleDefinitions } from '../services/getWorkTitleDefinitions';
import { scaleOrdinal } from 'd3-scale';

export const WorkCard = (props: { work?: Work | null }) => {

  const { work } = props;
  
  if (!work) return null;

  const x = getWorkTitleDefinitions(work.title);
  
  let y = work.title;

  x.forEach((wt, i) => {
    y = y.replace(wt.match, `___---${i}___`);
  });

  const z = y.split('___');

  const colorScale = scaleOrdinal(
    ['orchestration', 'counting', 'key', 'form'],
    ['#d1c4e9', '#bbdefb', '#c8e6c9', '#ffccbc'],
  );

  return (
    <Box>
      <Box display="flex" gap={2} sx={{ mb: 2 }}>

        {/* <ComposerCard composer={work.composer} /> */}
        
        <Box
          display="flex"
          flexDirection="column"
          gap={0.5}
        >
          <Typography
            variant="h3"
            sx={{
              fontStyle: 'italic',
              // fontSize: 36,
            }}
          >
            { z.map((segment) => {
              if (segment.startsWith('---')) {
                const i = Number(segment.replace('---', ''));

                return (
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={x[i].definition}
                    key={segment}
                  >
                    <span
                      style={{
                        background: colorScale(x[i].category),
                      }}
                    >
                      { x[i].match }
                    </span>
                  </Tooltip>
                );
              }
              return (
                <span key={segment}>
                  { segment }
                </span>
              );
            })}
          </Typography>
          
          <Typography
            variant="h4"
            sx={{
              mt: 0,
            }} >
            { work.composer.complete_name }
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
