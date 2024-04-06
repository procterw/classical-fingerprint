import { Box, Typography, Zoom, Tooltip, Link } from '@mui/material';
import { Work } from '../../services/getMusicData';
import { getWorkTitleDefinitions } from '../../services/getWorkTitleDefinitions';
import { scaleOrdinal } from 'd3-scale';

export const WorkCard = (props: { work?: Work | null }) => {

  const { work } = props;
  
  if (!work) return null;

  const definitions = getWorkTitleDefinitions(work.title);
  
  let workTitle = work.title;

  definitions.forEach((wt, i) => {
    workTitle = workTitle.replace(wt.match, `___---${i}___`);
  });

  const titleSegments = workTitle.split('___').filter(Boolean);

  const colorScale = scaleOrdinal(
    ['orchestration', 'counting', 'key', 'form'],
    ['#d1c4e9', '#bbdefb', '#c8e6c9', '#ffccbc'],
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      mb={2}
      gap={0.5}
    >
      <Typography
        variant="h3"
        sx={{
          fontStyle: 'italic',
        }}
      >
        { titleSegments.map((segment, j) => {
          const key = `${segment}_${work.id}_${j}`;

          const i = Number(segment.replace('---', ''));

          return (
            <span key={key} id={key}>
              { segment.startsWith('---') ? (
                <Tooltip
                  TransitionComponent={Zoom}
                  title={definitions[i].definition}
                >
                  <span
                    style={{
                      background: colorScale(definitions[i].category),
                    }}
                  >
                    { definitions[i].match }
                  </span>
                </Tooltip>
              ) : (
                <span>
                  { segment }
                </span>
              )}
            </span>
          );
        })}
      </Typography>
      {/* <span>{JSON.stringify(work.wiki_dates)}</span> */}
    </Box>
  );
};

export const WorkSummary = (props: { work?: Work | null }) => {

  const { work } = props;
  
  if (!work || !work.summary) return null;

  return (
    <Box>
      <Typography variant="body2" sx={{ pb: 1 }}>
        { work.summary }
      </Typography>
      <Link
        href={work.wiki_url}
        target="_blank"
        fontSize={14}
      >
        Summary from Wikipedia
      </Link>
    </Box>
  );
};